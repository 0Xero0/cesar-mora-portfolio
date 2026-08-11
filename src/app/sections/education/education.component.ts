import { Component, inject } from '@angular/core';
import { CvService } from '../../core/services/cv.service';
import { ScrollRevealDirective } from '../../shared/directives/scroll-reveal.directive';
import { SectionTitleComponent } from '../../shared/section-title/section-title.component';

@Component({
  selector: 'app-education',
  standalone: true,
  imports: [SectionTitleComponent, ScrollRevealDirective],
  templateUrl: './education.component.html',
  styleUrl: './education.component.scss',
})
export class EducationComponent {
  protected readonly cv = inject(CvService);
}
