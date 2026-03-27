import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  afterNextRender,
  inject,
} from '@angular/core';
import { gsap } from 'gsap';

import { TranslocoModule } from '@jsverse/transloco';

@Component({
  selector: 'app-presentation-section',
  standalone: true,
  imports: [TranslocoModule],
  templateUrl: './presentation-section.component.html',
  styleUrl: './presentation-section.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PresentationSectionComponent {
  private elementRef = inject(ElementRef);
  private destroyRef = inject(DestroyRef);

  constructor() {
    afterNextRender(() => {
      this.initCardEffect();
    });
  }

  private initCardEffect(): void {
    const card = this.elementRef.nativeElement.querySelector('#presentation-card') as HTMLElement;
    if (!card) return;

    const lightInside = card.querySelector('.light-inside') as HTMLElement;
    const lightOutside = card.querySelector('.light-outside') as HTMLElement;
    const lightWrapperFront = card.querySelector('.light-wrapper-in-front') as HTMLElement;

    const onMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const cx = rect.width / 2;
      const cy = rect.height / 2;

      gsap.to([lightInside, lightOutside], {
        x: x - cx,
        y: y - cy,
        duration: 0.6,
        ease: 'power2.out',
      });

      gsap.to(card, {
        rotateX: ((y - cy) / cy) * -8,
        rotateY: ((x - cx) / cx) * 8,
        transformPerspective: 1000,
        duration: 0.4,
        ease: 'power2.out',
      });
    };

    const onEnter = () => {
      lightWrapperFront.style.display = 'flex';
    };

    const onLeave = () => {
      lightWrapperFront.style.display = 'none';
      gsap.to([lightInside, lightOutside], {
        x: 0, y: 0,
        duration: 0.6,
        ease: 'power2.out',
      });
      gsap.to(card, {
        rotateX: 0,
        rotateY: 0,
        duration: 0.5,
        ease: 'power2.out',
      });
    };

    card.addEventListener('mousemove', onMove);
    card.addEventListener('mouseenter', onEnter);
    card.addEventListener('mouseleave', onLeave);

    this.destroyRef.onDestroy(() => {
      card.removeEventListener('mousemove', onMove);
      card.removeEventListener('mouseenter', onEnter);
      card.removeEventListener('mouseleave', onLeave);
    });
  }
}
