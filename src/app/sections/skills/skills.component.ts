import { Component, inject } from '@angular/core';
import { CvService } from '../../core/services/cv.service';
import { ScrollRevealDirective } from '../../shared/directives/scroll-reveal.directive';
import { SectionTitleComponent } from '../../shared/section-title/section-title.component';
import { SkillChipComponent } from '../../shared/skill-chip/skill-chip.component';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [SectionTitleComponent, ScrollRevealDirective, SkillChipComponent],
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.scss',
})
export class SkillsComponent {
  protected readonly cv = inject(CvService);
}
