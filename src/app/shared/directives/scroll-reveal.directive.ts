import { Directive, ElementRef, inject, input, OnInit } from '@angular/core';

@Directive({
  selector: '[appScrollReveal]',
  standalone: true,
})
export class ScrollRevealDirective implements OnInit {
  private readonly element = inject(ElementRef<HTMLElement>);

  readonly delay = input(0);

  ngOnInit(): void {
    const el = this.element.nativeElement;
    el.classList.add('scroll-reveal');

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
        if (entry.isIntersecting) {
          el.classList.add('is-visible');
          observer.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' },
    );

    observer.observe(el);
  }
}
