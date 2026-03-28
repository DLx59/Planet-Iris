import { SupportedLang } from '../models/article.model';

interface ArticleTranslations {
  headline: string;
  description: string;
  inLanguage: string;
  aboutTopics: string[];
}

const ARTICLE_ANIMAUX_DATA: Record<SupportedLang, ArticleTranslations> = {
  fr: {
    headline: "La photo d'iris pour les animaux : chiens, chats, chevaux et plus",
    description: "Planet'Iris photographie les iris de vos animaux : chiens, chats, chevaux. Séance à domicile ou à l'écurie, résultats garantis. Tarifs et infos de déplacement.",
    inLanguage: 'fr-BE',
    aboutTopics: ["Photographie macro d'iris", 'Animaux de compagnie', 'Photographie animalière'],
  },
  en: {
    headline: 'Iris photography for animals: dogs, cats, horses and more',
    description: "Planet'Iris photographs animal irises: dogs, cats, horses. Session at home or at the stable, guaranteed results. Pricing and travel information included.",
    inLanguage: 'en-BE',
    aboutTopics: ['Macro iris photography', 'Pets', 'Animal photography'],
  },
  nl: {
    headline: 'Irisfotografie voor dieren: honden, katten, paarden en meer',
    description: "Planet'Iris fotografeert dierenirrissen: honden, katten, paarden. Sessie aan huis of in de stal, resultaat gegarandeerd. Tarieven en verplaatsingsinformatie.",
    inLanguage: 'nl-BE',
    aboutTopics: ['Macro-irisfotografie', 'Huisdieren', 'Dierefotografie'],
  },
};

export function getArticleAnimauxSchema(lang: SupportedLang): object {
  const t = ARTICLE_ANIMAUX_DATA[lang] ?? ARTICLE_ANIMAUX_DATA['fr'];
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: t.headline,
    description: t.description,
    datePublished: '2026-03-25',
    dateModified: '2026-03-25',
    author: { '@type': 'Organization', name: "Planet'Iris" },
    publisher: {
      '@type': 'Organization',
      name: "Planet'Iris",
      logo: { '@type': 'ImageObject', url: 'https://www.planet-iris.com/img/planet-iris.webp' },
    },
    url: 'https://www.planet-iris.com/blog/photo-iris-animaux',
    mainEntityOfPage: 'https://www.planet-iris.com/blog/photo-iris-animaux',
    inLanguage: t.inLanguage,
    about: t.aboutTopics.map(name => ({ '@type': 'Thing', name })),
  };
}
