import { Component, inject } from '@angular/core';
import { CvService } from '../../core/services/cv.service';
import { ScrollRevealDirective } from '../../shared/directives/scroll-reveal.directive';
import { SectionTitleComponent } from '../../shared/section-title/section-title.component';
import { TimelineItemComponent } from '../../shared/timeline-item/timeline-item.component';

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [SectionTitleComponent, ScrollRevealDirective, TimelineItemComponent],
  templateUrl: './experience.component.html',
  styleUrl: './experience.component.scss',
})
export class ExperienceComponent {
  protected readonly cv = inject(CvService);
}
