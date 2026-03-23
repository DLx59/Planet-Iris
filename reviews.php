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

// --- Helpers ---
function google_request(string $url): ?array {
    $ch = curl_init($url);
    curl_setopt_array($ch, [
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_TIMEOUT        => 10,
        CURLOPT_SSL_VERIFYPEER => true,
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

// --- Étape 1 : trouver le Place ID via findplacefromtext ---
$find_url = 'https://maps.googleapis.com/maps/api/place/findplacefromtext/json?' . http_build_query([
    'input'        => "Planet'Iris",
    'inputtype'    => 'textquery',
    'locationbias' => 'circle:500@50.7737773,3.4330256',
    'fields'       => 'place_id',
    'key'          => $API_KEY,
]);

$find_data = google_request($find_url);

if (empty($find_data['candidates'][0]['place_id'])) {
    http_response_code(500);
    echo json_encode(['error' => 'Place introuvable']);
    exit;
}

$place_id = $find_data['candidates'][0]['place_id'];

// --- Étape 2 : récupérer les avis ---
$details_url = 'https://maps.googleapis.com/maps/api/place/details/json?' . http_build_query([
    'place_id'     => $place_id,
    'fields'       => 'reviews',
    'language'     => 'fr',
    'reviews_sort' => 'newest',
    'key'          => $API_KEY,
]);

$details_data = google_request($details_url);
$reviews      = $details_data['result']['reviews'] ?? [];

// --- Étape 3 : formater ---
$formatted = [];
foreach ($reviews as $review) {
    if (empty(trim($review['text']))) continue; // ignorer sans texte
    $formatted[] = [
        'name'   => format_name($review['author_name']),
        'rating' => (int) $review['rating'],
        'text'   => $review['text'],
    ];
}

$result = json_encode($formatted, JSON_UNESCAPED_UNICODE);

// --- Mise en cache ---
file_put_contents($CACHE_FILE, $result);

echo $result;
