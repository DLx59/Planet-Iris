import { SupportedLang } from '../models/article.model';

interface ArticleTranslations {
  headline: string;
  description: string;
  inLanguage: string;
  aboutTopics: string[];
}

const ARTICLE_FAMILLE_COULEUR_DATA: Record<SupportedLang, ArticleTranslations> = {
  fr: {
    headline: 'Famille aux yeux bleus (ou verts, ou marrons) : et alors ?',
    description: "Votre famille a tous les yeux de la même couleur ? Chaque iris reste unique. En macro, les structures, textures et détails de chaque oeil sont incomparables.",
    inLanguage: 'fr-BE',
    aboutTopics: ["Photographie macro d'iris", 'Unicité de l\'iris', 'Séance famille'],
  },
  en: {
    headline: 'A family with blue eyes (or green, or brown): so what?',
    description: "Your whole family has the same eye colour? Every iris is still unique. In macro photography, each eye reveals structures, textures and details unlike any other.",
    inLanguage: 'en-BE',
    aboutTopics: ['Macro iris photography', 'Iris uniqueness', 'Family session'],
  },
  nl: {
    headline: 'Een familie met blauwe ogen (of groene, of bruine): en dan?',
    description: "Heeft uw hele familie dezelfde oogkleur? Elke iris blijft uniek. In macrofotografie onthult elk oog structuren, texturen en details die nergens anders te vinden zijn.",
    inLanguage: 'nl-BE',
    aboutTopics: ['Macro-irisfotografie', 'Uniciteit van de iris', 'Familiesessie'],
  },
};

export function getArticleFamilleCouleurSchema(lang: SupportedLang): object {
  const t = ARTICLE_FAMILLE_COULEUR_DATA[lang] ?? ARTICLE_FAMILLE_COULEUR_DATA['fr'];
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: t.headline,
    description: t.description,
    datePublished: '2026-03-12',
    dateModified: '2026-03-12',
    author: { '@type': 'Organization', name: "Planet'Iris" },
    publisher: {
      '@type': 'Organization',
      name: "Planet'Iris",
      logo: { '@type': 'ImageObject', url: 'https://www.planet-iris.com/img/planet-iris.webp' },
    },
    url: 'https://www.planet-iris.com/blog/familles-meme-couleur-yeux',
    mainEntityOfPage: 'https://www.planet-iris.com/blog/familles-meme-couleur-yeux',
    inLanguage: t.inLanguage,
    about: t.aboutTopics.map(name => ({ '@type': 'Thing', name })),
  };
}
