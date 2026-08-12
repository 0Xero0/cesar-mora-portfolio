import { Component, HostListener, effect, inject, signal } from '@angular/core';
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

  constructor() {
    effect(() => {
      document.body.style.overflow = this.menuOpen() ? 'hidden' : '';
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

  scrollTo(id: string): void {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    this.menuOpen.set(false);
  }

  toggleMenu(): void {
    this.menuOpen.update((value) => !value);
  }
}
