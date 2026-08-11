import { Component, inject } from '@angular/core';
import { ScrollRevealDirective } from '../../shared/directives/scroll-reveal.directive';
import { SectionTitleComponent } from '../../shared/section-title/section-title.component';
import { CvService } from '../../core/services/cv.service';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [SectionTitleComponent, ScrollRevealDirective],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
})
export class AboutComponent {
  protected readonly cv = inject(CvService);
}
