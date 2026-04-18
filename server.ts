import { APP_BASE_HREF } from '@angular/common';
import { CommonEngine } from '@angular/ssr/node';
import express from 'express';
import { fileURLToPath } from 'node:url';
import { dirname, join, resolve } from 'node:path';
import { existsSync, mkdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import bootstrap from './src/main.server';
import { BROWSER_DIST_FOLDER } from './src/app/tokens/ssr.tokens';

const CACHE_TTL_MS = 6 * 60 * 60 * 1000;

const DEEPL_LANG_MAP: Record<string, string> = {
  en: 'EN-US',
  nl: 'NL',
};

interface GoogleReview {
  rating?: number;
  text?: { text: string };
  authorAttribution?: { displayName?: string; photoUri?: string };
}

interface FormattedReview {
  name: string;
  rating: number;
  text: string;
  photo?: string;
  original_lang?: string;
}

function formatName(fullName: string): string {
  const parts = fullName.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].charAt(0).toUpperCase() + parts[0].slice(1).toLowerCase();
  const first = parts[0].charAt(0).toUpperCase() + parts[0].slice(1).toLowerCase();
  const last = parts[parts.length - 1].charAt(0).toUpperCase() + '.';
  return `${first} ${last}`;
}

async function fetchFrenchReviews(apiKey: string): Promise<FormattedReview[]> {
  const searchRes = await fetch('https://places.googleapis.com/v1/places:searchText', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Goog-Api-Key': apiKey,
      'X-Goog-FieldMask': 'places.id',
    },
    body: JSON.stringify({
      textQuery: "Planet'Iris",
      languageCode: 'fr',
      locationBias: {
        circle: {
          center: { latitude: 50.7737773, longitude: 3.4330256 },
          radius: 500.0,
        },
      },
    }),
  });

  const searchData = await searchRes.json() as { places?: Array<{ id: string }> };
  const placeId = searchData.places?.[0]?.id;
  if (!placeId) throw new Error('Google Places: place not found');

  const detailsRes = await fetch(
    `https://places.googleapis.com/v1/places/${placeId}?languageCode=fr`,
    {
      headers: {
        'X-Goog-Api-Key': apiKey,
        'X-Goog-FieldMask': [
          'reviews.rating',
          'reviews.text',
          'reviews.authorAttribution.displayName',
          'reviews.authorAttribution.photoUri',
        ].join(','),
      },
    },
  );

  const detailsData = await detailsRes.json() as { reviews?: GoogleReview[] };

  return (detailsData.reviews ?? [])
    .filter(r => r.text?.text?.trim())
    .map(r => ({
      name: formatName(r.authorAttribution?.displayName ?? 'Anonyme'),
      rating: r.rating ?? 5,
      text: r.text!.text,
      photo: r.authorAttribution?.photoUri,
    }));
}

async function translateReviews(
  reviews: FormattedReview[],
  lang: string,
  apiKey: string,
): Promise<FormattedReview[]> {
  const targetLang = DEEPL_LANG_MAP[lang];
  if (!targetLang) return reviews;

  const baseUrl = apiKey.endsWith(':fx')
    ? 'https://api-free.deepl.com'
    : 'https://api.deepl.com';

  const res = await fetch(`${baseUrl}/v2/translate`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `DeepL-Auth-Key ${apiKey}`,
    },
    body: JSON.stringify({
      text: reviews.map(r => r.text),
      source_lang: 'FR',
      target_lang: targetLang,
    }),
  });

  const data = await res.json() as { translations?: Array<{ text: string }> };
  const translations = data.translations ?? [];

  return reviews.map((r, i) => ({
    ...r,
    text: translations[i]?.text ?? r.text,
    original_lang: 'fr',
  }));
}

async function getReviews(lang: string, cacheDir: string): Promise<FormattedReview[]> {
  const googleApiKey = process.env['GOOGLE_API_KEY'];
  const deeplApiKey = process.env['DEEPL_API_KEY'];

  if (!googleApiKey) throw new Error('GOOGLE_API_KEY not configured');

  const cacheFile = join(cacheDir, `reviews_cache_${lang}.json`);

  if (existsSync(cacheFile)) {
    const ageMs = Date.now() - statSync(cacheFile).mtimeMs;
    if (ageMs < CACHE_TTL_MS) {
      return JSON.parse(readFileSync(cacheFile, 'utf-8')) as FormattedReview[];
    }
  }

  let reviews = await fetchFrenchReviews(googleApiKey);

  if (lang !== 'fr' && deeplApiKey) {
    reviews = await translateReviews(reviews, lang, deeplApiKey);
  }

  mkdirSync(cacheDir, { recursive: true });
  writeFileSync(cacheFile, JSON.stringify(reviews));

  return reviews;
}

export function app(port: string = '4000'): express.Express {
  const server = express();
  const serverDistFolder = dirname(fileURLToPath(import.meta.url));
  const browserDistFolder = resolve(serverDistFolder, '../browser');
  const indexHtml = join(serverDistFolder, 'index.server.html');
  // Default: /var/www/planet-iris-website/cache (two levels above dist/server/)
  const cacheDir = process.env['REVIEWS_CACHE_DIR'] ?? join(serverDistFolder, '../../cache');

  const commonEngine = new CommonEngine();

  server.set('view engine', 'html');
  server.set('views', browserDistFolder);

  server.use(express.static(browserDistFolder, {
    maxAge: '1y',
    index: 'index.html',
  }));

  server.get('/api/reviews', (req, res) => {
    const lang = (req.query['lang'] as string) || 'fr';
    getReviews(lang, cacheDir)
      .then(reviews => res.json(reviews))
      .catch(err => {
        console.error('[reviews]', err);
        res.status(500).json([]);
      });
  });

  server.get('*path', (req, res, next) => {
    const { originalUrl, baseUrl } = req;

    commonEngine
      .render({
        bootstrap,
        documentFilePath: indexHtml,
        url: `http://localhost:${port}${originalUrl}`,
        publicPath: browserDistFolder,
        providers: [
          { provide: APP_BASE_HREF, useValue: baseUrl },
          { provide: BROWSER_DIST_FOLDER, useValue: browserDistFolder },
        ],
      })
      .then((html) => res.send(html))
      .catch((err) => next(err));
  });

  return server;
}

function run(): void {
  const port = process.env['PORT'] ?? '4000';
  const server = app(port);
  server.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

run();
