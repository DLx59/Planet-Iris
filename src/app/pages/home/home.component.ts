import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  afterNextRender,
  inject,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TranslocoModule } from '@jsverse/transloco';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { HeroSectionComponent } from '../../components/hero-section/hero-section.component';
import { ConfianceSectionComponent } from '../../components/confiance-section/confiance-section.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { AnimationService } from '../../services/animation.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterLink,
    TranslocoModule,
    NavbarComponent,
    HeroSectionComponent,
    ConfianceSectionComponent,
    FooterComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  private animationService = inject(AnimationService);
  private destroyRef = inject(DestroyRef);

  constructor() {
    afterNextRender(() => {
      this.animationService.initFadeInOnScroll();
      this.initStatsCounters();
      this.initChatbot();

      this.destroyRef.onDestroy(() => {
        this.animationService.destroyAll();
      });
    });
  }

  private initStatsCounters(): void {
    gsap.registerPlugin(ScrollTrigger);

    const counters: Array<{ stat: string; to: number; display: (v: number) => string }> = [
      { stat: 'price',  to: 50,  display: v => `${Math.round(v)}€` },
      { stat: 'days',   to: 3,   display: v => `${Math.round(v)} j` },
      { stat: 'unique', to: 100, display: v => `${Math.round(v)}%` },
      { stat: 'rating', to: 5,   display: v => `⭐ ${Math.round(v)}/5` },
    ];

    counters.forEach(({ stat, to, display }) => {
      const el = document.querySelector<HTMLElement>(`[data-stat="${stat}"]`);
      if (!el) return;

      el.textContent = display(0);

      const obj = { val: 0 };
      gsap.to(obj, {
        val: to,
        duration: 1.8,
        ease: 'power2.out',
        scrollTrigger: { trigger: el, start: 'top 85%', once: true },
        onUpdate() { el.textContent = display(obj.val); },
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
