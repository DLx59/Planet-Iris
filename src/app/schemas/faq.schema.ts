import { SupportedLang } from '../models/article.model';

interface FaqEntry {
  q: string;
  a: string;
}

const FAQ_DATA: Record<SupportedLang, FaqEntry[]> = {
  fr: [
    {
      q: 'Comment se déroule une séance photo ?',
      a: "La séance dure environ 30 minutes dans notre studio à Avelgem. Aucune préparation particulière n'est nécessaire. Notre appareil macro s'approche à quelques millimètres de votre oeil pour capturer chaque détail de votre iris : reliefs, couleurs, motifs, dans les meilleures conditions. Nous photographions les deux iris et vous choisissez ensuite selon votre préférence.",
    },
    {
      q: 'Est-ce que ça fait mal ou est-ce dangereux ?',
      a: "Pas du tout. L'appareil ne touche jamais votre oeil. Chaque prise de vue ne dure que quelques secondes par oeil. C'est une expérience sans contact et accessible à tous.",
    },
    {
      q: 'En quelle langue se déroule la séance ?',
      a: "Nos séances se déroulent en français ou en anglais. Pour nos amis néerlandophones, nous vous présentons toutes nos excuses : nous faisons de notre mieux pour trouver le temps d'apprendre votre belle langue !",
    },
    {
      q: 'Je porte des lentilles de contact, que dois-je faire ?',
      a: "Il est nécessaire de retirer vos lentilles avant la séance afin que l'iris soit parfaitement net sur la photo. Prévoyez vos lunettes ou venez les yeux nus le jour du rendez-vous.",
    },
    {
      q: 'Combien de temps avant de recevoir mes photos ?',
      a: 'Les fichiers digitaux haute définition sont livrés dans les 3 jours ouvrables suivant votre séance. Les impressions sont disponibles sous 15 jours ouvrables à compter de la réception du fichier digital. Le fichier digital est inclus dans toute commande d\'impression.',
    },
    {
      q: "Quels formats et supports d'impression proposez-vous ?",
      a: "Nous proposons deux supports : l'acrylique (plexiglass) et l'alu-dibond (finition mate ou brillante), déclinés en plusieurs ratios (carré, rectangle, rond). Les dimensions varient selon le format choisi. Consultez notre page Tarifs pour le détail complet.",
    },
    {
      q: 'Peut-on photographier des enfants ?',
      a: "Oui, les enfants sont les bienvenus. Un supplément de 35 € par enfant de moins de 12 ans est appliqué, en raison du soin supplémentaire nécessaire pour réaliser la mise au point sur un iris en mouvement.",
    },
    {
      q: 'Peut-on photographier des animaux de compagnie ?',
      a: "Oui ! Un supplément de 65 € par animal est appliqué. Pour les animaux de compagnie, nous nous déplaçons à domicile. Le déplacement est gratuit dans un rayon de 10 km autour d'Avelgem (soit 20 km aller/retour inclus). Au-delà, des frais de déplacement de 0,50 € par kilomètre sont facturés. Contactez-nous au préalable via nos réseaux sociaux pour vérifier la faisabilité selon le type d'animal.",
    },
    {
      q: 'Où se situe le studio ?',
      a: "Notre studio est situé à Avelgem (8580), en Belgique, entre Courtrai (Kortrijk) et Mouscron. L'adresse exacte vous sera communiquée lors de la confirmation de votre rendez-vous.",
    },
    {
      q: 'Comment réserver une séance ?',
      a: 'La réservation se fait uniquement par message privé sur nos réseaux sociaux : Facebook (planet.iris.belgique) ou Instagram (planet_iris_belgique). Nous vous répondrons dans les plus brefs délais pour convenir d\'une date.',
    },
  ],
  en: [
    {
      q: 'What happens during a photo session?',
      a: "The session lasts about 30 minutes in our studio in Avelgem. No special preparation is needed. Our macro lens gets within a few millimetres of your eye to capture every detail of your iris: textures, colours, patterns, in the best conditions. We photograph both irises and you then choose based on your preference.",
    },
    {
      q: 'Does it hurt or is it dangerous?',
      a: "Not at all. The device never touches your eye. Each shot lasts only a few seconds per eye. It's a contactless experience, accessible to everyone.",
    },
    {
      q: 'In which language is the session conducted?',
      a: "Our sessions are conducted in French or English. To our Dutch-speaking friends, we sincerely apologise: we are doing our best to find the time to learn your beautiful language!",
    },
    {
      q: 'I wear contact lenses, what should I do?',
      a: "You will need to remove your contact lenses before the session so that your iris is perfectly sharp in the photo. Plan to bring your glasses or come with bare eyes on the day of your appointment.",
    },
    {
      q: 'How long before I receive my photos?',
      a: 'High-definition digital files are delivered within 3 business days of your session. Prints are available within 15 business days from receipt of the digital file. The digital file is included with any print order.',
    },
    {
      q: 'What print formats and materials do you offer?',
      a: 'We offer two materials: acrylic (plexiglass) and alu-dibond (matte or glossy finish), in several ratios (square, rectangle, round). Dimensions vary by format. Check our Pricing page for full details.',
    },
    {
      q: 'Can children be photographed?',
      a: 'Yes, children are welcome. A supplement of €35 per child under 12 applies, due to the extra care needed to focus on a moving iris.',
    },
    {
      q: 'Can pets be photographed?',
      a: "Yes! A supplement of €65 per animal applies. For pets, we travel to your home. Travel is free within a 10 km radius around Avelgem (20 km return included). Beyond that, travel costs of €0.50 per kilometre are charged. Please contact us beforehand via our social media to check feasibility depending on the type of animal.",
    },
    {
      q: 'Where is the studio located?',
      a: 'Our studio is located in Avelgem (8580), Belgium, between Kortrijk and Mouscron. The exact address will be communicated upon confirmation of your appointment.',
    },
    {
      q: 'How do I book a session?',
      a: 'Booking is done exclusively via private message on our social media: Facebook (planet.iris.belgique) or Instagram (planet_iris_belgique). We will reply as soon as possible to arrange a date.',
    },
  ],
  nl: [
    {
      q: 'Hoe verloopt een fotosessie?',
      a: 'De sessie duurt ongeveer 30 minuten in ons studio in Avelgem. Geen speciale voorbereiding nodig. Onze macro-lens gaat tot op enkele millimeter van uw oog om elk detail van uw iris vast te leggen: texturen, kleuren, patronen, onder de beste omstandigheden. We fotograferen beide irissen en u kiest daarna op basis van uw voorkeur.',
    },
    {
      q: 'Doet het pijn of is het gevaarlijk?',
      a: 'Helemaal niet. Het apparaat raakt uw oog nooit aan. Elke opname duurt slechts enkele seconden per oog. Het is een contactloze ervaring, toegankelijk voor iedereen.',
    },
    {
      q: 'In welke taal verloopt de sessie?',
      a: 'Onze sessies verlopen in het Frans of Engels. Aan onze Nederlandstalige vrienden bieden wij onze oprechte excuses aan : we doen ons uiterste best om de tijd te vinden om uw prachtige taal te leren!',
    },
    {
      q: 'Ik draag contactlenzen, wat moet ik doen?',
      a: 'U dient uw contactlenzen te verwijderen voor de sessie zodat uw iris perfect scherp op de foto staat. Neem uw bril mee of kom met blote ogen op de dag van uw afspraak.',
    },
    {
      q: "Hoe lang duurt het voor ik mijn foto's ontvang?",
      a: 'Digitale bestanden in hoge definitie worden geleverd binnen 3 werkdagen na uw sessie. Prints zijn beschikbaar binnen 15 werkdagen na ontvangst van het digitale bestand. Het digitale bestand is inbegrepen bij elke printbestelling.',
    },
    {
      q: 'Welke afdrukformaten en materialen biedt u aan?',
      a: "Wij bieden twee materialen: acryliek (plexiglas) en alu-dibond (matte of glanzende afwerking), in verschillende ratio's (vierkant, rechthoek, rond). Afmetingen variëren per formaat. Bekijk onze Tarieven-pagina voor alle details.",
    },
    {
      q: 'Kunnen kinderen worden gefotografeerd?',
      a: 'Ja, kinderen zijn welkom. Een toeslag van €35 per kind onder 12 jaar wordt toegepast, vanwege de extra zorg die nodig is om scherp te stellen op een bewegende iris.',
    },
    {
      q: 'Kunnen huisdieren worden gefotografeerd?',
      a: 'Ja! Een toeslag van 65 € per dier wordt aangerekend. Voor huisdieren komen wij bij u thuis. Verplaatsing is gratis binnen een straal van 10 km rond Avelgem (20 km heen en terug inbegrepen). Daarbuiten worden verplaatsingskosten van 0,50 € per kilometer aangerekend. Neem vooraf contact met ons op via onze sociale media om de haalbaarheid te controleren afhankelijk van het type dier.',
    },
    {
      q: 'Waar is de studio gelegen?',
      a: 'Ons studio is gelegen in Avelgem (8580), België, tussen Kortrijk en Moeskroen. Het exacte adres wordt meegedeeld bij de bevestiging van uw afspraak.',
    },
    {
      q: 'Hoe reserveer ik een sessie?',
      a: 'Reserveren gebeurt uitsluitend via privébericht op onze sociale media: Facebook (planet.iris.belgique) of Instagram (planet_iris_belgique). Wij antwoorden zo snel mogelijk om een datum af te spreken.',
    },
  ],
};

export function getFaqSchema(lang: SupportedLang): object {
  const items = FAQ_DATA[lang] ?? FAQ_DATA['fr'];
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  };
}
