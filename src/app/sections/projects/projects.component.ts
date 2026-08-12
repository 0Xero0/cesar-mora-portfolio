import { Component, inject } from '@angular/core';
import { CvService } from '../../core/services/cv.service';
import { ScrollRevealDirective } from '../../shared/directives/scroll-reveal.directive';
import { TiltDirective } from '../../shared/directives/tilt.directive';
import { SectionTitleComponent } from '../../shared/section-title/section-title.component';
import { SkillChipComponent } from '../../shared/skill-chip/skill-chip.component';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [
    SectionTitleComponent,
    ScrollRevealDirective,
    TiltDirective,
    SkillChipComponent,
  ],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss',
})
export class ProjectsComponent {
  protected readonly cv = inject(CvService);
}
