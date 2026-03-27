import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  afterNextRender,
  inject,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslocoModule } from '@jsverse/transloco';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

@Component({
  selector: 'app-hero-section',
  standalone: true,
  imports: [RouterLink, TranslocoModule],
  templateUrl: './hero-section.component.html',
  styleUrl: './hero-section.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroSectionComponent {
  private elementRef = inject(ElementRef);
  private destroyRef = inject(DestroyRef);

  constructor() {
    afterNextRender(() => {
      gsap.registerPlugin(ScrollTrigger);
      this.initEntryAnimation();
      this.initMouseParallax();
      this.initScrollParallax();
    });
  }

  /** "Planet'" glisse depuis la gauche, "Iris" depuis la droite */
  private initEntryAnimation(): void {
    gsap.fromTo('.hero-text-wrapper._01',
      { x: -120, opacity: 0 },
      { x: 0, opacity: 1, duration: 1.2, ease: 'power3.out', delay: 0.2 }
    );
    gsap.fromTo('.hero-text-wrapper._02',
      { x: 120, opacity: 0 },
      { x: 0, opacity: 1, duration: 1.2, ease: 'power3.out', delay: 0.4 }
    );
    gsap.fromTo('.hero-paragraph-holder',
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power2.out', delay: 0.8 }
    );
  }

  /** Planet'Iris (les deux textes liés) et l'iris bougent en sens opposé */
  private initMouseParallax(): void {
    const section = this.elementRef.nativeElement as HTMLElement;

    const onMove = (e: MouseEvent) => {
      const rect = section.getBoundingClientRect();
      const dx = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
      const dy = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);

      // Les deux textes se déplacent ensemble comme un seul bloc
      gsap.to('.hero-text-holder', {
        x: dx * 30,
        y: dy * 15,
        duration: 0.9,
        ease: 'power2.out',
      });

      // L'image iris va dans le sens opposé → effet de profondeur
      gsap.to('.iris-holder', {
        x: dx * -30,
        y: dy * -15,
        duration: 1.1,
        ease: 'power2.out',
      });
    };

    const onLeave = () => {
      gsap.to(['.hero-text-holder', '.iris-holder'], {
        x: 0,
        y: 0,
        duration: 0.9,
        ease: 'power2.out',
      });
    };

    section.addEventListener('mousemove', onMove);
    section.addEventListener('mouseleave', onLeave);

    this.destroyRef.onDestroy(() => {
      section.removeEventListener('mousemove', onMove);
      section.removeEventListener('mouseleave', onLeave);
    });
  }

  /** L'image iris descend plus lentement que le scroll → effet de profondeur */
  private initScrollParallax(): void {
    gsap.to('.iris-holder', {
      yPercent: -25,
      ease: 'none',
      scrollTrigger: {
        trigger: '.hero-section-text-holder',
        start: 'top top',
        end: 'bottom top',
        scrub: 1.5,
      },
    });
  }
}
