import { SupportedLang } from '../models/article.model';

interface BusinessTranslations {
  description: string;
  websiteDescription: string;
  offerCatalogName: string;
  serviceNames: [string, string, string, string, string, string];
  inLanguage: string;
}

const BUSINESS_DATA: Record<SupportedLang, BusinessTranslations> = {
  fr: {
    description: "Studio de photographie d'iris à Avelgem, proche de Courtrai (Kortrijk) et Mouscron, Belgique. Portraits macro artistiques et personnalisés de vos yeux.",
    websiteDescription: "Studio de photographie d'iris à Avelgem, proche de Dottignies (Mouscron), Belgique",
    offerCatalogName: "Photographie d'iris",
    serviceNames: [
      "Photo digitale HD - 1 iris",
      "Photo digitale HD - 2 iris",
      "Photo digitale HD - 3 iris",
      "Photo digitale HD - 4 iris",
      "Photo digitale HD - 5 iris",
      "Photo digitale HD - 6 iris",
    ],
    inLanguage: 'fr-BE',
  },
  en: {
    description: 'Iris photography studio in Avelgem, near Kortrijk and Mouscron, Belgium. Artistic and personalised macro portraits of your eyes.',
    websiteDescription: 'Iris photography studio in Avelgem, near Dottignies (Mouscron), Belgium',
    offerCatalogName: 'Iris photography',
    serviceNames: [
      'HD digital photo - 1 iris',
      'HD digital photo - 2 iris',
      'HD digital photo - 3 iris',
      'HD digital photo - 4 iris',
      'HD digital photo - 5 iris',
      'HD digital photo - 6 iris',
    ],
    inLanguage: 'en-BE',
  },
  nl: {
    description: 'Studio voor irisfotografie in Avelgem, dicht bij Kortrijk en Moeskroen, België. Artistieke en gepersonaliseerde macroprints van uw ogen.',
    websiteDescription: 'Studio voor irisfotografie in Avelgem, dicht bij Dottignies (Moeskroen), België',
    offerCatalogName: 'Irisfotografie',
    serviceNames: [
      'HD digitale foto - 1 iris',
      'HD digitale foto - 2 iris',
      'HD digitale foto - 3 iris',
      'HD digitale foto - 4 iris',
      'HD digitale foto - 5 iris',
      'HD digitale foto - 6 iris',
    ],
    inLanguage: 'nl-BE',
  },
};

const PRICES: [string, string, string, string, string, string] = ['50', '90', '120', '140', '150', '160'];

export function getBusinessSchema(lang: SupportedLang): object {
  const t = BUSINESS_DATA[lang] ?? BUSINESS_DATA['fr'];
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'LocalBusiness',
        '@id': 'https://www.planet-iris.com/#business',
        name: "Planet'Iris",
        description: t.description,
        url: 'https://www.planet-iris.com/',
        email: 'contact@planetiris.com',
        image: 'https://www.planet-iris.com/img/planet-iris.webp',
        logo: 'https://www.planet-iris.com/img/planet-iris.webp',
        priceRange: '€€',
        currenciesAccepted: 'EUR',
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Avelgem',
          addressRegion: 'West-Vlaanderen',
          postalCode: '8580',
          addressCountry: 'BE',
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: 50.7747,
          longitude: 3.6516,
        },
        areaServed: [
          { '@type': 'City', name: 'Avelgem' },
          { '@type': 'City', name: 'Dottignies' },
          { '@type': 'City', name: 'Mouscron' },
          { '@type': 'City', name: 'Kortrijk' },
          { '@type': 'City', name: 'Courtrai' },
          { '@type': 'City', name: 'Tournai' },
          { '@type': 'City', name: 'Lille' },
        ],
        foundingDate: '2024',
        founder: [
          { '@type': 'Person', name: 'Emilie Deman' },
          { '@type': 'Person', name: 'Denis Wojtowicz' },
        ],
        sameAs: [
          'https://www.facebook.com/planet.iris.belgique/',
          'https://www.instagram.com/planet_iris_belgique/',
        ],
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: t.offerCatalogName,
          itemListElement: t.serviceNames.map((name, i) => ({
            '@type': 'Offer',
            itemOffered: { '@type': 'Service', name },
            price: PRICES[i],
            priceCurrency: 'EUR',
          })),
        },
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: '5',
          reviewCount: '3',
          bestRating: '5',
          worstRating: '1',
        },
      },
      {
        '@type': 'WebSite',
        '@id': 'https://www.planet-iris.com/#website',
        url: 'https://www.planet-iris.com/',
        name: "Planet'Iris",
        description: t.websiteDescription,
        inLanguage: t.inLanguage,
        publisher: { '@id': 'https://www.planet-iris.com/#business' },
      },
    ],
  };
}
