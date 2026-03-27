import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  afterNextRender,
  inject,
} from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { gsap } from 'gsap';

@Component({
  selector: 'app-tarif-section',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './tarif-section.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TarifSectionComponent {
  private destroyRef = inject(DestroyRef);
  private elementRef = inject(ElementRef);
  private router = inject(Router);

  constructor() {
    afterNextRender(() => {
      this.initContactButtonAnimation();
    });
  }

  private navigateToContact(): void {
    this.router.navigate(['/contact']);
  }

  private initContactButtonAnimation(): void {
    const contactButton = this.elementRef.nativeElement.querySelector('#contact-button') as HTMLElement;
    if (!contactButton) return;

    const originalHTML = contactButton.innerHTML;

    contactButton.addEventListener('click', () => {
      gsap.timeline()
        .to(contactButton, {
          duration: 0.2,
          opacity: 0,
          onComplete: () => {
            contactButton.innerHTML = '<svg id="eye-svg" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path d="M15 12c0 1.654-1.346 3-3 3s-3-1.346-3-3 1.346-3 3-3 3 1.346 3 3zm9-.449s-4.252 8.449-11.985 8.449c-7.18 0-12.015-8.449-12.015-8.449s4.446-7.551 12.015-7.551c7.694 0 11.985 7.551 11.985 7.551zm-7 .449c0-2.757-2.243-5-5-5s-5 2.243-5 5 2.243 5 5 5 5-2.243 5-5z"/></svg>';
            gsap.set(contactButton, { opacity: 1 });
          }
        })
        .to(contactButton, {
          duration: 0.25,
          width: '50px',
          height: '50px',
          borderRadius: '50%',
          ease: 'power2.out',
        })
        .to('#eye-svg', {
          duration: 0.25,
          scale: 1.5,
          repeat: 1,
          yoyo: true,
          ease: 'power2.inOut',
          onComplete: () => {
            this.navigateToContact();
            gsap.timeline().to(contactButton, {
              duration: 0.5,
              width: '164px',
              height: '51px',
              borderRadius: '20px',
              ease: 'power2.out',
              onComplete: () => {
                contactButton.innerHTML = originalHTML;
              }
            });
          }
        });
    });

    this.destroyRef.onDestroy(() => {
      contactButton.replaceWith(contactButton.cloneNode(true));
    });
  }
}
