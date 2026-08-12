import { Directive, ElementRef, HostListener, inject } from '@angular/core';

@Directive({
  selector: '[appTilt]',
  standalone: true,
})
export class TiltDirective {
  private readonly element = inject(ElementRef<HTMLElement>);

  private enabled =
    window.matchMedia('(pointer: fine)').matches &&
    !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  @HostListener('mousemove', ['$event'])
  onMove(event: MouseEvent): void {
    if (!this.enabled) {
      return;
    }
    const el = this.element.nativeElement;
    const rect = el.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width;
    const py = (event.clientY - rect.top) / rect.height;
    const rotateY = (px - 0.5) * 6;
    const rotateX = (0.5 - py) * 6;
    el.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
  }

  @HostListener('mouseleave')
  onLeave(): void {
    if (!this.enabled) {
      return;
    }
    this.element.nativeElement.style.transform = '';
  }
}
