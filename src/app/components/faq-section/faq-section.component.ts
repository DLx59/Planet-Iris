import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

interface FaqItem {
  question: string;
  answer: string;
}

@Component({
  selector: 'app-faq-section',
  standalone: true,
  templateUrl: './faq-section.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FaqSectionComponent {
  openIndex = signal<number | null>(null);

  toggle(index: number): void {
    this.openIndex.update(current => current === index ? null : index);
  }

  faqItems: FaqItem[] = [
    {
      question: 'Comment se déroule une séance photo ?',
      answer: 'La séance dure environ 30 minutes dans notre studio à Avelgem. Aucune préparation particulière n\'est nécessaire. Notre appareil macro s\'approche à quelques millimètres de votre œil pour capturer chaque détail de votre iris — reliefs, couleurs, motifs — dans les meilleures conditions.',
    },
    {
      question: 'Est-ce que ça fait mal ou est-ce dangereux ?',
      answer: 'Pas du tout. L\'appareil ne touche jamais votre œil. La séance utilise uniquement une lumière douce et une lentille macro. C\'est une expérience agréable et sans contact, accessible à tous. Les personnes portant des lentilles de contact doivent simplement les retirer avant la séance.',
    },
    {
      question: 'Combien de temps avant de recevoir mes photos ?',
      answer: 'Les fichiers digitaux haute définition sont livrés dans les 3 jours ouvrables suivant votre séance. Les impressions encadrées sont disponibles sous 15 jours ouvrables à compter de la réception du fichier digital.',
    },
    {
      question: 'Quels formats et supports d\'impression proposez-vous ?',
      answer: 'Nous proposons plusieurs supports (papier, aluminium…) et différents ratios (carré, rectangle, rond). Les dimensions varient selon le format choisi. Consultez notre page Tarifs pour le détail complet des formats, dimensions et prix disponibles.',
    },
    {
      question: 'Peut-on photographier des enfants ?',
      answer: 'Oui, les enfants sont les bienvenus. Un supplément de 35 € par enfant de moins de 12 ans est appliqué, en raison du soin supplémentaire nécessaire pour réaliser la mise au point sur un iris en mouvement.',
    },
    {
      question: 'Peut-on photographier des animaux de compagnie ?',
      answer: 'Oui ! Un supplément de 65 € par animal est appliqué. Contactez-nous au préalable via nos réseaux sociaux pour vérifier la faisabilité selon le type d\'animal.',
    },
    {
      question: 'Où se situe le studio ?',
      answer: 'Notre studio est situé à Avelgem (8580), en Belgique, entre Courtrai (Kortrijk) et Mouscron. L\'adresse exacte vous sera communiquée lors de la confirmation de votre rendez-vous.',
    },
    {
      question: 'Comment réserver une séance ?',
      answer: 'La réservation se fait uniquement par message privé sur nos réseaux sociaux : Facebook (planet.iris.belgique) ou Instagram (planet_iris_belgique). Nous vous répondrons dans les plus brefs délais pour convenir d\'une date.',
    },
  ];
}
