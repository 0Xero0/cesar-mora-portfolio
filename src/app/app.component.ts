import { Component, ElementRef, HostListener, computed, signal, viewChild } from '@angular/core';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { HeroComponent } from './sections/hero/hero.component';
import { AboutComponent } from './sections/about/about.component';
import { ExperienceComponent } from './sections/experience/experience.component';
import { SkillsComponent } from './sections/skills/skills.component';
import { EducationComponent } from './sections/education/education.component';
import { ContactComponent } from './sections/contact/contact.component';
import { ProjectsComponent } from './sections/projects/projects.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    HeaderComponent,
    FooterComponent,
    HeroComponent,
    AboutComponent,
    ExperienceComponent,
    SkillsComponent,
    EducationComponent,
    ProjectsComponent,
    ContactComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  readonly RING_CIRCUMFERENCE = 125.66;

  readonly scrollProgress = signal(0);

  readonly showBackToTop = signal(false);

  readonly ringOffset = computed(
    () => this.RING_CIRCUMFERENCE * (1 - this.scrollProgress() / 100),
  );

  private readonly cursorGlow = viewChild<ElementRef<HTMLElement>>('cursorGlow');

  private glowEnabled =
    window.matchMedia('(pointer: fine)').matches &&
    !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  @HostListener('window:scroll')
  @HostListener('window:resize')
  onScroll(): void {
    const doc = document.documentElement;
    const max = doc.scrollHeight - window.innerHeight;
    this.scrollProgress.set(max > 0 ? (window.scrollY / max) * 100 : 0);
    this.showBackToTop.set(window.scrollY > 600);
  }

  @HostListener('window:mousemove', ['$event'])
  onMouseMove(event: MouseEvent): void {
    if (!this.glowEnabled) {
      return;
    }
    const glow = this.cursorGlow()?.nativeElement;
    if (glow) {
      glow.style.translate = `${event.clientX}px ${event.clientY}px`;
    }
  }

  backToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
