import { SupportedLang } from '../models/article.model';

interface ArticleTranslations {
  headline: string;
  description: string;
  inLanguage: string;
  aboutTopics: string[];
}

const ARTICLE_MARRONS_DATA: Record<SupportedLang, ArticleTranslations> = {
  fr: {
    headline: 'Yeux marrons : bien plus beaux que vous ne le croyez',
    description: "Vous pensez que vos yeux marrons feront un résultat banal ? En macro, les iris marrons sont parmi les plus fascinants. Découvrez pourquoi.",
    inLanguage: 'fr-BE',
    aboutTopics: ["Photographie macro d'iris", 'Yeux marrons'],
  },
  en: {
    headline: 'Brown eyes: far more beautiful than you think',
    description: "Think your brown eyes won't look great in a photo? In macro photography, brown irises are among our most spectacular results. Discover why.",
    inLanguage: 'en-BE',
    aboutTopics: ['Macro iris photography', 'Brown eyes'],
  },
  nl: {
    headline: 'Bruine ogen: veel mooier dan u denkt',
    description: 'Denkt u dat uw bruine ogen saai zijn in macro? Bruine irissen zijn bij onze mooiste resultaten. Ontdek waarom bij Planet\'Iris in Avelgem.',
    inLanguage: 'nl-BE',
    aboutTopics: ['Macro-irisfotografie', 'Bruine ogen'],
  },
};

export function getArticleMarronsSchema(lang: SupportedLang): object {
  const t = ARTICLE_MARRONS_DATA[lang] ?? ARTICLE_MARRONS_DATA['fr'];
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: t.headline,
    description: t.description,
    datePublished: '2026-02-12',
    dateModified: '2026-02-12',
    author: { '@type': 'Organization', name: "Planet'Iris" },
    publisher: {
      '@type': 'Organization',
      name: "Planet'Iris",
      logo: { '@type': 'ImageObject', url: 'https://www.planet-iris.com/img/planet-iris.webp' },
    },
    url: 'https://www.planet-iris.com/blog/iris-yeux-marrons',
    mainEntityOfPage: 'https://www.planet-iris.com/blog/iris-yeux-marrons',
    inLanguage: t.inLanguage,
    about: t.aboutTopics.map(name => ({ '@type': 'Thing', name })),
  };
}
