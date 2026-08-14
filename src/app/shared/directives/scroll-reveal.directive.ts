import { Directive, ElementRef, afterNextRender, inject, input } from '@angular/core';

@Directive({
  selector: '[appScrollReveal]',
  standalone: true,
})
export class ScrollRevealDirective {
  private readonly element = inject(ElementRef<HTMLElement>);

  readonly delay = input(0);

  constructor() {
    const el = this.element.nativeElement;
    el.classList.add('scroll-reveal');

    afterNextRender(() => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        el.classList.add('is-visible');
        return;
      }

      const delayMs = this.delay();
      if (delayMs > 0) {
        el.style.transitionDelay = `${delayMs}ms`;
      }

      const observer = new IntersectionObserver(
        ([entry]) => {
          el.classList.toggle('is-visible', entry.isIntersecting);
        },
        { threshold: 0.12, rootMargin: '-48px 0px -40px 0px' },
      );

      observer.observe(el);
    });
  }
}
