import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  afterNextRender,
  inject,
} from '@angular/core';
import { gsap } from 'gsap';

@Component({
  selector: 'app-contact-section',
  standalone: true,
  templateUrl: './contact-section.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactSectionComponent {
  private elementRef = inject(ElementRef);
  private destroyRef = inject(DestroyRef);

  constructor() {
    afterNextRender(() => {
      this.initSocialParallax();
    });
  }

  private initSocialParallax(): void {
    const icons = this.elementRef.nativeElement.querySelectorAll('.social-icon img') as NodeListOf<HTMLElement>;

    const handlers: Array<{ el: HTMLElement; move: (e: MouseEvent) => void; leave: () => void }> = [];

    icons.forEach(icon => {
      const onMove = (e: MouseEvent) => {
        const rect = icon.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const moveX = (e.clientX - centerX) * -0.1;
        const moveY = (e.clientY - centerY) * -0.1;
        gsap.to(icon, { x: moveX, y: moveY, ease: 'none', duration: 0.5 });
      };

      const onLeave = () => {
        gsap.to(icon, { x: 0, y: 0, ease: 'power1.out', duration: 0.5 });
      };

      icon.addEventListener('mousemove', onMove);
      icon.addEventListener('mouseleave', onLeave);
      handlers.push({ el: icon, move: onMove, leave: onLeave });
    });

    this.destroyRef.onDestroy(() => {
      handlers.forEach(({ el, move, leave }) => {
        el.removeEventListener('mousemove', move);
        el.removeEventListener('mouseleave', leave);
      });
    });
  }
}
