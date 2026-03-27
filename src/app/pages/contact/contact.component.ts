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
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { BreadcrumbComponent } from '../../components/breadcrumb/breadcrumb.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { AnimationService } from '../../services/animation.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [TranslocoModule, NavbarComponent, BreadcrumbComponent, FooterComponent],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactComponent {
  private elementRef = inject(ElementRef);
  private destroyRef = inject(DestroyRef);
  private animationService = inject(AnimationService);

  constructor() {
    afterNextRender(() => {
      this.animationService.initFadeInOnScroll();
      this.initCardHover();

      this.destroyRef.onDestroy(() => {
        this.animationService.destroyAll();
      });
    });
  }

  private initCardHover(): void {
    const cards = this.elementRef.nativeElement.querySelectorAll('.contact-card') as NodeListOf<HTMLElement>;
    const handlers: Array<{ el: HTMLElement; move: (e: MouseEvent) => void; leave: () => void }> = [];

    cards.forEach(card => {
      const icon = card.querySelector('.contact-card-icon img') as HTMLElement;
      if (!icon) return;

      const onMove = (e: MouseEvent) => {
        const rect = card.getBoundingClientRect();
        const dx = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
        const dy = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
        gsap.to(icon, { x: dx * -8, y: dy * -8, duration: 0.4, ease: 'power2.out' });
      };

      const onLeave = () => {
        gsap.to(icon, { x: 0, y: 0, duration: 0.5, ease: 'power2.out' });
      };

      card.addEventListener('mousemove', onMove);
      card.addEventListener('mouseleave', onLeave);
      handlers.push({ el: card, move: onMove, leave: onLeave });
    });

    this.destroyRef.onDestroy(() => {
      handlers.forEach(({ el, move, leave }) => {
        el.removeEventListener('mousemove', move);
        el.removeEventListener('mouseleave', leave);
      });
    });
  }
}
