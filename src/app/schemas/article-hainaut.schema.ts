import { SupportedLang } from '../models/article.model';

interface ArticleTranslations {
  headline: string;
  description: string;
  inLanguage: string;
  aboutTopics: string[];
}

const ARTICLE_HAINAUT_DATA: Record<SupportedLang, ArticleTranslations> = {
  fr: {
    headline: "Photo d'iris en Hainaut : Planet'Iris, à 20 minutes de chez vous",
    description: "Studio de photo d'iris à Avelgem, à 20 minutes de Tournai et du Hainaut. Séances de 30 minutes, résultats HD en 3 jours. Photographe d'iris en Belgique.",
    inLanguage: 'fr-BE',
    aboutTopics: ["Photographie d'iris", 'Hainaut', 'Tournai', 'Belgique'],
  },
  en: {
    headline: 'Iris photography near Hainaut: Planet\'Iris, 20 minutes away',
    description: 'Iris photography studio in Avelgem, 20 minutes from Tournai and Hainaut. 30-minute sessions, HD results in 3 days. Iris photographer in Belgium.',
    inLanguage: 'en-BE',
    aboutTopics: ['Iris photography', 'Hainaut', 'Tournai', 'Belgium'],
  },
  nl: {
    headline: 'Irisfoto in Henegouwen: Planet\'Iris, op 20 minuten van u',
    description: 'Studio voor irisfotografie in Avelgem, op 20 minuten van Doornik en Henegouwen. Sessies van 30 minuten, HD-resultaten binnen 3 dagen. Irisfotograaf in België.',
    inLanguage: 'nl-BE',
    aboutTopics: ['Irisfotografie', 'Henegouwen', 'Doornik', 'België'],
  },
};

export function getArticleHainautSchema(lang: SupportedLang): object {
  const t = ARTICLE_HAINAUT_DATA[lang] ?? ARTICLE_HAINAUT_DATA['fr'];
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: t.headline,
    description: t.description,
    datePublished: '2026-03-07',
    dateModified: '2026-03-07',
    author: { '@type': 'Organization', name: "Planet'Iris" },
    publisher: {
      '@type': 'Organization',
      name: "Planet'Iris",
      logo: { '@type': 'ImageObject', url: 'https://www.planet-iris.com/img/planet-iris.webp' },
    },
    url: 'https://www.planet-iris.com/blog/photo-iris-hainaut',
    mainEntityOfPage: 'https://www.planet-iris.com/blog/photo-iris-hainaut',
    inLanguage: t.inLanguage,
    about: t.aboutTopics.map(name => ({ '@type': 'Thing', name })),
  };
}
