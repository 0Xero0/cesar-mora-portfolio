import { Component, ElementRef, HostListener, PLATFORM_ID, effect, inject, signal, viewChild } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CvService } from '../../core/services/cv.service';
import { ThemeService } from '../../core/services/theme.service';

const NAV_ITEMS = [
  { id: 'about', label: 'Resumen' },
  { id: 'experience', label: 'Experiencia' },
  { id: 'projects', label: 'Proyectos' },
  { id: 'skills', label: 'Habilidades' },
  { id: 'education', label: 'Formación' },
  { id: 'contact', label: 'Contacto' },
];

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  protected readonly cv = inject(CvService);

  protected readonly theme = inject(ThemeService);

  protected readonly navItems = NAV_ITEMS;

  protected readonly menuOpen = signal(false);

  protected readonly activeSection = signal('hero');

  protected readonly isScrolled = signal(false);

  private readonly platformId = inject(PLATFORM_ID);

  private readonly navRef = viewChild<ElementRef<HTMLElement>>('nav');
  private readonly toggleRef = viewChild<ElementRef<HTMLButtonElement>>('menuToggle');

  constructor() {
    effect(() => {
      if (isPlatformBrowser(this.platformId)) {
        document.body.style.overflow = this.menuOpen() ? 'hidden' : '';
      }
    });
  }

  @HostListener('window:scroll')
  onScroll(): void {
    this.isScrolled.set(window.scrollY > 12);

    const sections = ['hero', ...NAV_ITEMS.map((item) => item.id)];
    const scrollY = window.scrollY + 120;

    for (const id of [...sections].reverse()) {
      const element = document.getElementById(id);
      if (element && element.offsetTop <= scrollY) {
        this.activeSection.set(id);
        break;
      }
    }
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    if (this.menuOpen()) {
      this.menuOpen.set(false);
      this.focusToggle();
    }
  }

  @HostListener('document:keydown.tab', ['$event'])
  onTab(event: KeyboardEvent): void {
    if (!this.menuOpen() || !isPlatformBrowser(this.platformId)) {
      return;
    }
    const nav = this.navRef()?.nativeElement;
    if (!nav) {
      return;
    }
    const focusable = Array.from(
      nav.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
      ),
    ).filter((el) => !el.hasAttribute('disabled') && el.offsetParent !== null);

    if (focusable.length === 0) {
      event.preventDefault();
      return;
    }
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    const active = document.activeElement as HTMLElement;

    if (event.shiftKey) {
      if (active === first || !nav.contains(active)) {
        event.preventDefault();
        last.focus();
      }
    } else {
      if (active === last) {
        event.preventDefault();
        first.focus();
      }
    }
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (!this.menuOpen() || !isPlatformBrowser(this.platformId)) {
      return;
    }
    const target = event.target as HTMLElement;
    const nav = this.navRef()?.nativeElement;
    const toggle = this.toggleRef()?.nativeElement;
    if (nav?.contains(target) || toggle?.contains(target)) {
      return;
    }
    this.menuOpen.set(false);
    this.focusToggle();
  }

  scrollTo(id: string): void {
    const wasOpen = this.menuOpen();
    this.menuOpen.set(false);
    this.focusToggle();
    if (isPlatformBrowser(this.platformId)) {
      const delay = wasOpen ? 200 : 0;
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, delay);
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  toggleMenu(): void {
    const wasOpen = this.menuOpen();
    this.menuOpen.update((value) => !value);
    if (wasOpen) {
      this.focusToggle();
    } else {
      setTimeout(() => {
        const nav = this.navRef()?.nativeElement;
        const first = nav?.querySelector<HTMLElement>('.header__link');
        first?.focus();
      });
    }
  }

  closeMenu(): void {
    this.menuOpen.set(false);
    this.focusToggle();
  }

  private focusToggle(): void {
    if (isPlatformBrowser(this.platformId)) {
      setTimeout(() => {
        this.toggleRef()?.nativeElement?.focus();
      });
    }
  }
}
