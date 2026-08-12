import { Component, inject } from '@angular/core';
import { CvService } from '../../core/services/cv.service';
import { MagneticDirective } from '../../shared/directives/magnetic.directive';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [MagneticDirective],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss',
})
export class HeroComponent {
  protected readonly cv = inject(CvService);

  scrollToContact(): void {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  }
}
