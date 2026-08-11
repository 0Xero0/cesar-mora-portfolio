import { Component, input, signal } from '@angular/core';
import { Experience } from '../../core/models/cv.model';
import { CvService } from '../../core/services/cv.service';

@Component({
  selector: 'app-timeline-item',
  standalone: true,
  imports: [],
  templateUrl: './timeline-item.component.html',
  styleUrl: './timeline-item.component.scss',
})
export class TimelineItemComponent {
  readonly item = input.required<Experience>();
  readonly expanded = signal(true);

  constructor(protected readonly cv: CvService) {}

  toggle(): void {
    this.expanded.update((value) => !value);
  }
}
