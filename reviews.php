<?php
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: https://www.planet-iris.com');

require_once __DIR__ . '/config.php';
$API_KEY    = GOOGLE_API_KEY;
$CACHE_FILE = __DIR__ . '/reviews_cache.json';
$CACHE_TTL  = 3600; // 1 heure

// --- Retourner le cache s'il est encore frais ---
if (file_exists($CACHE_FILE) && (time() - filemtime($CACHE_FILE)) < $CACHE_TTL) {
    echo file_get_contents($CACHE_FILE);
    exit;
}

// --- Helper POST (Places API New) ---
function places_post(string $url, array $body, string $api_key): ?array {
    $json = json_encode($body);
    $ch   = curl_init($url);
    curl_setopt_array($ch, [
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_TIMEOUT        => 10,
        CURLOPT_POST           => true,
        CURLOPT_POSTFIELDS     => $json,
        CURLOPT_HTTPHEADER     => [
            'Content-Type: application/json',
            'X-Goog-Api-Key: ' . $api_key,
            'X-Goog-FieldMask: places.id',
        ],
    ]);
    $response = curl_exec($ch);
    curl_close($ch);
    return $response ? json_decode($response, true) : null;
}

function places_get(string $url, string $api_key, string $fields): ?array {
    $ch = curl_init($url);
    curl_setopt_array($ch, [
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_TIMEOUT        => 10,
        CURLOPT_HTTPHEADER     => [
            'X-Goog-Api-Key: ' . $api_key,
            'X-Goog-FieldMask: ' . $fields,
        ],
    ]);
    $response = curl_exec($ch);
    curl_close($ch);
    return $response ? json_decode($response, true) : null;
}

function format_name(string $full_name): string {
    $full_name = trim($full_name);
    $parts     = preg_split('/\s+/', $full_name);
    if (count($parts) === 1) return ucfirst(strtolower($parts[0]));
    $first = ucfirst(strtolower($parts[0]));
    $last  = strtoupper(substr($parts[count($parts) - 1], 0, 1)) . '.';
    return "$first $last";
}

// --- Étape 1 : trouver le Place ID (Places API New - Text Search) ---
$search_data = places_post(
    'https://places.googleapis.com/v1/places:searchText',
    [
        'textQuery'    => "Planet'Iris",
        'languageCode' => 'fr',
        'locationBias' => [
            'circle' => [
                'center' => ['latitude' => 50.7737773, 'longitude' => 3.4330256],
                'radius' => 500.0,
            ],
        ],
    ],
    $API_KEY
);

if (empty($search_data['places'][0]['id'])) {
    http_response_code(500);
    echo json_encode(['error' => 'Place introuvable', 'debug' => $search_data]);
    exit;
}

$place_id = $search_data['places'][0]['id'];

// --- Étape 2 : récupérer les avis (Places API New - Place Details) ---
$details_data = places_get(
    'https://places.googleapis.com/v1/places/' . $place_id . '?languageCode=fr',
    $API_KEY,
    'reviews'
);

$reviews = $details_data['reviews'] ?? [];

// --- Étape 3 : formater ---
$formatted = [];
foreach ($reviews as $review) {
    $text = $review['text']['text'] ?? '';
    if (empty(trim($text))) continue;
    $formatted[] = [
        'name'   => format_name($review['authorAttribution']['displayName'] ?? 'Anonyme'),
        'rating' => (float) ($review['rating'] ?? 5),
        'text'   => $text,
    ];
}

$result = json_encode($formatted, JSON_UNESCAPED_UNICODE);

// --- Mise en cache ---
file_put_contents($CACHE_FILE, $result);

echo $result;
