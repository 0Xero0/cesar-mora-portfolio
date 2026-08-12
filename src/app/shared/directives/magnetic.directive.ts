import { Directive, ElementRef, HostListener, inject } from '@angular/core';

@Directive({
  selector: '[appMagnetic]',
  standalone: true,
})
export class MagneticDirective {
  private readonly element = inject(ElementRef<HTMLElement>);

  private enabled =
    window.matchMedia('(pointer: fine)').matches &&
    !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  @HostListener('mousemove', ['$event'])
  onMove(event: MouseEvent): void {
    if (!this.enabled) {
      return;
    }
    const rect = this.element.nativeElement.getBoundingClientRect();
    const x = (event.clientX - rect.left - rect.width / 2) * 0.3;
    const y = (event.clientY - rect.top - rect.height / 2) * 0.3;
    this.element.nativeElement.style.transform = `translate(${x}px, ${y}px)`;
  }

  @HostListener('mouseleave')
  onLeave(): void {
    if (!this.enabled) {
      return;
    }
    this.element.nativeElement.style.transform = '';
  }
}
