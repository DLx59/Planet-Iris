import { Injectable } from '@angular/core';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

@Injectable({ providedIn: 'root' })
export class AnimationService {
  private initialized = false;

  initGlobalAnimations(): void {
    if (this.initialized) return;
    this.initialized = true;

    gsap.registerPlugin(ScrollTrigger);
    this.initFloatingIris();
    this.initReviewsParallax();
    this.initFadeInOnScroll();
  }

  private initFloatingIris(): void {
    const mainContainer = document.querySelector('.main-container') as HTMLElement;
    const extraLongContainer = mainContainer?.querySelector('.extra-long-container') as HTMLElement;
    if (!mainContainer || !extraLongContainer) return;

    const scrollTween = gsap.to('.extra-long-container', {
      xPercent: -100,
      x: () => window.innerWidth,
      ease: 'none',
      scrollTrigger: {
        pin: '.main-container',
        trigger: '.main-container',
        start: 'top left',
        end: () => `+=${extraLongContainer.offsetWidth - window.innerWidth}`,
        scrub: 1,
      }
    });

    gsap.timeline({
      scrollTrigger: {
        trigger: '.iris-flottant',
        start: 'left right',
        end: () => `right -${extraLongContainer.offsetWidth}`,
        scrub: 1,
        containerAnimation: scrollTween
      }
    }).to('.iris-flottant', {
      scale: 2,
      rotation: 830,
      duration: 10
    });
  }

  private initReviewsParallax(): void {
    if (window.innerWidth <= 768) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '#avis',
        start: 'top 7%',
        end: 'bottom+=50% center',
        pin: true,
        pinSpacing: false,
        scrub: true
      }
    });

    tl.to('.box', {
      y: (i: number, el: HTMLElement) =>
        (1 - parseFloat(el.getAttribute('data-speed') ?? '1')) * ScrollTrigger.maxScroll(window),
      ease: 'none',
      stagger: 0.1
    }, 0);

    tl.to('#contact', {
      onStart: () => {
        const contact = document.querySelector('#contact') as HTMLElement;
        const confiance = document.querySelector('#confiance') as HTMLElement;
        if (contact && confiance) {
          contact.style.top = `${confiance.getBoundingClientRect().bottom}px`;
        }
      },
      y: 0,
      ease: 'none',
    });

    gsap.timeline({
      scrollTrigger: {
        trigger: '#avis',
        start: 'left 10%',
        endTrigger: '#contact',
        end: 'top bottom',
        pin: true,
        pinSpacing: false,
        onLeave: () => gsap.set('#avis', { clearProps: 'pin' })
      }
    });
  }

  private initFadeInOnScroll(): void {
    gsap.utils.toArray<HTMLElement>('.fade-in-on-scroll').forEach(el => {
      gsap.fromTo(el,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
          }
        }
      );
    });

    gsap.utils.toArray<HTMLElement>('.fade-in-move-on-scroll').forEach(el => {
      gsap.fromTo(el,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
          }
        }
      );
    });
  }

  destroyAll(): void {
    ScrollTrigger.getAll().forEach(t => t.kill());
    this.initialized = false;
  }
}
