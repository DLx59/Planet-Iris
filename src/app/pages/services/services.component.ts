import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  afterNextRender,
  inject,
} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { TranslocoModule } from '@jsverse/transloco';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { BreadcrumbComponent } from '../../components/breadcrumb/breadcrumb.component';
import { VosIrisSectionComponent } from '../../components/vos-iris-section/vos-iris-section.component';
import { TarifSectionComponent } from '../../components/tarif-section/tarif-section.component';
import { FaqSectionComponent } from '../../components/faq-section/faq-section.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { AnimationService } from '../../services/animation.service';

const FAQ_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Comment se déroule une séance photo ?',
      acceptedAnswer: { '@type': 'Answer', text: 'La séance dure environ 30 minutes dans notre studio à Avelgem. Aucune préparation particulière n\'est nécessaire. Notre appareil macro s\'approche à quelques millimètres de votre œil pour capturer chaque détail de votre iris — reliefs, couleurs, motifs — dans les meilleures conditions.' },
    },
    {
      '@type': 'Question',
      name: 'Est-ce que ça fait mal ou est-ce dangereux ?',
      acceptedAnswer: { '@type': 'Answer', text: 'Pas du tout. L\'appareil ne touche jamais votre œil. La séance utilise uniquement une lumière douce et une lentille macro. C\'est une expérience agréable et sans contact, accessible à tous. Les personnes portant des lentilles de contact doivent simplement les retirer avant la séance.' },
    },
    {
      '@type': 'Question',
      name: 'Combien de temps avant de recevoir mes photos ?',
      acceptedAnswer: { '@type': 'Answer', text: 'Les fichiers digitaux haute définition sont livrés dans les 3 jours ouvrables suivant votre séance. Les impressions encadrées sont disponibles sous 15 jours ouvrables à compter de la réception du fichier digital.' },
    },
    {
      '@type': 'Question',
      name: 'Quels formats et supports d\'impression proposez-vous ?',
      acceptedAnswer: { '@type': 'Answer', text: 'Nous proposons plusieurs supports (papier, aluminium…) et différents ratios (carré, rectangle, rond). Les dimensions varient selon le format choisi.' },
    },
    {
      '@type': 'Question',
      name: 'Peut-on photographier des enfants ?',
      acceptedAnswer: { '@type': 'Answer', text: 'Oui, les enfants sont les bienvenus. Un supplément de 35 € par enfant de moins de 12 ans est appliqué, en raison du soin supplémentaire nécessaire pour réaliser la mise au point sur un iris en mouvement.' },
    },
    {
      '@type': 'Question',
      name: 'Peut-on photographier des animaux de compagnie ?',
      acceptedAnswer: { '@type': 'Answer', text: 'Oui ! Un supplément de 65 € par animal est appliqué. Contactez-nous au préalable via nos réseaux sociaux pour vérifier la faisabilité selon le type d\'animal.' },
    },
    {
      '@type': 'Question',
      name: 'Où se situe le studio ?',
      acceptedAnswer: { '@type': 'Answer', text: 'Notre studio est situé à Avelgem (8580), en Belgique, entre Courtrai (Kortrijk) et Mouscron. L\'adresse exacte vous sera communiquée lors de la confirmation de votre rendez-vous.' },
    },
    {
      '@type': 'Question',
      name: 'Comment réserver une séance ?',
      acceptedAnswer: { '@type': 'Answer', text: 'La réservation se fait uniquement par message privé sur nos réseaux sociaux : Facebook (planet.iris.belgique) ou Instagram (planet_iris_belgique). Nous vous répondrons dans les plus brefs délais pour convenir d\'une date.' },
    },
  ],
};

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [
    TranslocoModule,
    NavbarComponent,
    BreadcrumbComponent,
    VosIrisSectionComponent,
    TarifSectionComponent,
    FaqSectionComponent,
    FooterComponent,
  ],
  templateUrl: './services.component.html',
  styleUrl: './services.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ServicesComponent {
  private animationService = inject(AnimationService);
  private destroyRef = inject(DestroyRef);
  private document = inject(DOCUMENT);

  constructor() {
    afterNextRender(() => {
      this.animationService.initFadeInOnScroll();
      this.injectFaqSchema();

      this.destroyRef.onDestroy(() => {
        this.animationService.destroyAll();
        this.document.getElementById('faq-schema')?.remove();
      });
    });
  }

  private injectFaqSchema(): void {
    const script = this.document.createElement('script');
    script.id = 'faq-schema';
    script.type = 'application/ld+json';
    script.text = JSON.stringify(FAQ_SCHEMA);
    this.document.head.appendChild(script);
  }
}
