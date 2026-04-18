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
import { PageTitleService } from '../../services/page-title.service';
import { HeroSectionComponent } from '../../components/hero-section/hero-section.component';
import { ConfianceSectionComponent } from '../../components/confiance-section/confiance-section.component';
import { ArticleTeaserSectionComponent } from '../../components/article-teaser-section/article-teaser-section.component';
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
    ArticleTeaserSectionComponent,
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
    inject(PageTitleService).set('page-title.home');

    afterNextRender(() => {
      this.animationService.initFadeInOnScroll();
      this.initStatsCounters();

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

}
