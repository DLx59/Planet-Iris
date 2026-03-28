import { SupportedLang } from '../models/article.model';

interface ArticleTranslations {
  headline: string;
  description: string;
  inLanguage: string;
  aboutCondition: string;
  aboutService: string;
}

const ARTICLE_CATARACTE_DATA: Record<SupportedLang, ArticleTranslations> = {
  fr: {
    headline: "Photographie d'iris et cataracte : c'est possible",
    description: "Vous avez une cataracte ? Une séance de photographie d'iris chez Planet'Iris est tout à fait réalisable. Sans contact, éclairage maîtrisé, résultat garanti.",
    inLanguage: 'fr-BE',
    aboutCondition: 'Cataracte',
    aboutService: "Photographie d'iris macro",
  },
  en: {
    headline: "Iris photography and cataracts: it's possible",
    description: "Have a cataract? An iris photography session at Planet'Iris is entirely feasible. No contact, controlled lighting, and a guaranteed result.",
    inLanguage: 'en-BE',
    aboutCondition: 'Cataract',
    aboutService: 'Macro iris photography',
  },
  nl: {
    headline: 'Irisfotografie en staar: het kan',
    description: 'Heeft u staar? Een irisfotografiesessie bij Planet\'Iris is perfect mogelijk. Geen contact, gecontroleerde belichting en een gegarandeerd resultaat.',
    inLanguage: 'nl-BE',
    aboutCondition: 'Staar',
    aboutService: 'Macro-irisfotografie',
  },
};

export function getArticleCataracteSchema(lang: SupportedLang): object {
  const t = ARTICLE_CATARACTE_DATA[lang] ?? ARTICLE_CATARACTE_DATA['fr'];
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: t.headline,
    description: t.description,
    datePublished: '2026-03-28',
    dateModified: '2026-03-28',
    author: { '@type': 'Organization', name: "Planet'Iris" },
    publisher: {
      '@type': 'Organization',
      name: "Planet'Iris",
      logo: { '@type': 'ImageObject', url: 'https://www.planet-iris.com/img/planet-iris.webp' },
    },
    url: 'https://www.planet-iris.com/blog/photo-iris-cataracte',
    mainEntityOfPage: 'https://www.planet-iris.com/blog/photo-iris-cataracte',
    inLanguage: t.inLanguage,
    about: [
      { '@type': 'MedicalCondition', name: t.aboutCondition },
      { '@type': 'Service', name: t.aboutService },
    ],
  };
}
