import { Component, input } from '@angular/core';

@Component({
  selector: 'app-section-title',
  standalone: true,
  template: `
    <div class="section-title">
      <p class="section-title__eyebrow">{{ eyebrow() }}</p>
      <h2 class="section-title__heading">{{ heading() }}</h2>
      @if (subtitle()) {
        <p class="section-title__subtitle">{{ subtitle() }}</p>
      }
    </div>
  `,
  styleUrl: './section-title.component.scss',
})
export class SectionTitleComponent {
  readonly eyebrow = input('Sección');
  readonly heading = input('');
  readonly subtitle = input<string | undefined>(undefined);
}
