import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  afterNextRender,
  inject,
} from '@angular/core';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

@Component({
  selector: 'app-faq-section',
  standalone: true,
  templateUrl: './faq-section.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FaqSectionComponent {
  private destroyRef = inject(DestroyRef);

  constructor() {
    afterNextRender(() => {
      gsap.registerPlugin(ScrollTrigger);
      this.initDarkToLightTransition();
    });
  }

  private initDarkToLightTransition(): void {
    // Le white-mode-holder part de 50vh (en bas) et monte jusqu'à 100vh
    const st = gsap.to('.white-mode-holder', {
      height: '100vh',
      ease: 'none',
      scrollTrigger: {
        trigger: '.dark-and-light-mode-holder',
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1,
      },
    });

    this.destroyRef.onDestroy(() => st.scrollTrigger?.kill());
  }
}
