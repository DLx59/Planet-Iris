import { Injectable } from '@angular/core';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const FADE_SELECTOR = '.fade-in-on-scroll, .fade-in-move-on-scroll';

@Injectable({ providedIn: 'root' })
export class AnimationService {

  private fadeObserver: IntersectionObserver | null = null;
  private domObserver: MutationObserver | null = null;

  initGlobalAnimations(): void {
    gsap.registerPlugin(ScrollTrigger);
    this.initFloatingIris();
    this.initReviewsParallax();
    this.initFadeInOnScroll();
  }

  initFadeInOnScroll(): void {
    this.fadeObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          this.fadeObserver!.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    const observeAll = (root: ParentNode) => {
      root.querySelectorAll<Element>(FADE_SELECTOR).forEach(el => {
        if (!el.classList.contains('visible')) {
          this.fadeObserver!.observe(el);
        }
      });
    };

    observeAll(document);

    this.domObserver = new MutationObserver(mutations => {
      mutations.forEach(mutation => {
        mutation.addedNodes.forEach(node => {
          if (node.nodeType === Node.ELEMENT_NODE) {
            const el = node as Element;
            if (el.matches(FADE_SELECTOR)) this.fadeObserver!.observe(el);
            observeAll(el);
          }
        });
      });
    });

    this.domObserver.observe(document.body, { childList: true, subtree: true });
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

    gsap.timeline({
      scrollTrigger: {
        trigger: '#avis',
        start: 'top 7%',
        end: 'bottom+=50% center',
        pin: true,
        pinSpacing: false,
        scrub: true
      }
    }).to('.box', {
      y: (i: number, el: HTMLElement) =>
        (1 - parseFloat(el.getAttribute('data-speed') ?? '1')) * ScrollTrigger.maxScroll(window),
      ease: 'none',
      stagger: 0.1
    }, 0);
  }

  destroyAll(): void {
    ScrollTrigger.getAll().forEach(t => t.kill());
    this.fadeObserver?.disconnect();
    this.fadeObserver = null;
    this.domObserver?.disconnect();
    this.domObserver = null;
  }
}
