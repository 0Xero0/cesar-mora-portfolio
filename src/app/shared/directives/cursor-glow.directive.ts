import { Directive, ElementRef, HostListener, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Directive({
  selector: '[appCursorGlow]',
  standalone: true,
})
export class CursorGlowDirective {
  private readonly element = inject(ElementRef<HTMLElement>);
  private readonly platformId = inject(PLATFORM_ID);

  private enabled =
    isPlatformBrowser(this.platformId) &&
    window.matchMedia('(pointer: fine)').matches &&
    !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  private frame: number | null = null;
  private lastX = 0;
  private lastY = 0;

  @HostListener('window:mousemove', ['$event'])
  onMouseMove(event: MouseEvent): void {
    if (!this.enabled) {
      return;
    }
    this.lastX = event.clientX;
    this.lastY = event.clientY;
    if (this.frame === null) {
      this.frame = requestAnimationFrame(() => {
        this.element.nativeElement.style.translate = `calc(${this.lastX}px - 50%) calc(${this.lastY}px - 50%)`;
        this.frame = null;
      });
    }
  }
}
