import { Directive, ElementRef, HostListener, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Directive({
  selector: '[appMagnetic]',
  standalone: true,
})
export class MagneticDirective {
  private readonly element = inject(ElementRef<HTMLElement>);

  private readonly platformId = inject(PLATFORM_ID);

  private enabled =
    isPlatformBrowser(this.platformId) &&
    window.matchMedia('(pointer: fine)').matches &&
    !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  private frame: number | null = null;
  private lastX = 0;
  private lastY = 0;

  @HostListener('mousemove', ['$event'])
  onMove(event: MouseEvent): void {
    if (!this.enabled) {
      return;
    }
    const rect = this.element.nativeElement.getBoundingClientRect();
    this.lastX = (event.clientX - rect.left - rect.width / 2) * 0.3;
    this.lastY = (event.clientY - rect.top - rect.height / 2) * 0.3;
    if (this.frame === null) {
      this.frame = requestAnimationFrame(() => {
        this.element.nativeElement.style.transform = `translate(${this.lastX}px, ${this.lastY}px)`;
        this.frame = null;
      });
    }
  }

  @HostListener('mouseleave')
  onLeave(): void {
    if (!this.enabled) {
      return;
    }
    if (this.frame !== null) {
      cancelAnimationFrame(this.frame);
      this.frame = null;
    }
    this.element.nativeElement.style.transform = '';
  }
}
