import { Component, inject } from '@angular/core';
import { CvService } from '../../core/services/cv.service';
import { ScrollRevealDirective } from '../../shared/directives/scroll-reveal.directive';
import { SectionTitleComponent } from '../../shared/section-title/section-title.component';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [SectionTitleComponent, ScrollRevealDirective],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
})
export class ContactComponent {
  protected readonly cv = inject(CvService);
}
