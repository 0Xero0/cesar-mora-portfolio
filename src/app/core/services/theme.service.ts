import { Injectable, computed, effect, signal } from '@angular/core';

type Theme = 'dark' | 'light';

const STORAGE_KEY = 'portfolio-theme';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly themeSignal = signal<Theme>('dark');

  readonly theme = this.themeSignal.asReadonly();

  readonly isLight = computed(() => this.themeSignal() === 'light');

  constructor() {
    this.themeSignal.set(this.getInitialTheme());

    effect(() => {
      const theme = this.themeSignal();
      document.documentElement.dataset['theme'] = theme;
      document.querySelector('meta[name="theme-color"]')?.setAttribute(
        'content',
        theme === 'light' ? '#f5f8fd' : '#0f1419',
      );
      try {
        localStorage.setItem(STORAGE_KEY, theme);
      } catch {
        // Ignorar almacenamiento no disponible (modo privado).
      }
    });
  }

  toggle(): void {
    this.themeSignal.update((value) => (value === 'dark' ? 'light' : 'dark'));
  }

  private getInitialTheme(): Theme {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored === 'light' || stored === 'dark') {
        return stored;
      }
    } catch {
      // Ignorar almacenamiento no disponible.
    }
    return window.matchMedia('(prefers-color-scheme: light)').matches
      ? 'light'
      : 'dark';
  }
}
