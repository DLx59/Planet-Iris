import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  afterNextRender,
  inject,
} from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { HeroSectionComponent } from '../../components/hero-section/hero-section.component';
import { PresentationSectionComponent } from '../../components/presentation-section/presentation-section.component';
import { VosIrisSectionComponent } from '../../components/vos-iris-section/vos-iris-section.component';
import { TarifSectionComponent } from '../../components/tarif-section/tarif-section.component';
import { ConfianceSectionComponent } from '../../components/confiance-section/confiance-section.component';
import { FaqSectionComponent } from '../../components/faq-section/faq-section.component';
import { ContactSectionComponent } from '../../components/contact-section/contact-section.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { AnimationService } from '../../services/animation.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    NavbarComponent,
    HeroSectionComponent,
    PresentationSectionComponent,
    VosIrisSectionComponent,
    TarifSectionComponent,
    ConfianceSectionComponent,
    FaqSectionComponent,
    ContactSectionComponent,
    FooterComponent,
  ],
  templateUrl: './home.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  private animationService = inject(AnimationService);
  private destroyRef = inject(DestroyRef);

  constructor() {
    afterNextRender(() => {
      this.animationService.initGlobalAnimations();
      this.initChatbot();

      this.destroyRef.onDestroy(() => {
        this.animationService.destroyAll();
      });
    });
  }

  private initChatbot(): void {
    const iframe = document.createElement('iframe');
    iframe.src = 'https://applimova.ai/embededChatbot?id=6855d36e2abf63dae86887d0';
    const isMobile = window.innerWidth < 768;
    const expandedWidth = isMobile ? '90%' : '420px';
    const expandedHeight = isMobile ? 'calc(100vh - 100px)' : '600px';

    Object.assign(iframe.style, {
      position: 'fixed',
      bottom: '0',
      right: isMobile ? '5%' : '30px',
      border: 'none',
      zIndex: '1000',
      width: '50px',
      height: '70px',
      borderRadius: '10px',
      pointerEvents: 'none',
    });

    document.body.appendChild(iframe);

    const messageHandler = (event: MessageEvent) => {
      const data = event.data;
      if (data && typeof data === 'object') {
        if (data.chatbotOpen === true) {
          iframe.style.width = expandedWidth;
          iframe.style.height = expandedHeight;
          iframe.style.pointerEvents = 'auto';
        } else if (data.chatbotOpen === false) {
          iframe.style.width = '50px';
          iframe.style.height = '70px';
          iframe.style.pointerEvents = 'none';
        }
      }
    };

    window.addEventListener('message', messageHandler);

    this.destroyRef.onDestroy(() => {
      window.removeEventListener('message', messageHandler);
      iframe.remove();
    });
  }
}
