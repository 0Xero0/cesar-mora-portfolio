import { Component, input } from '@angular/core';

@Component({
  selector: 'app-skill-chip',
  standalone: true,
  template: `<span class="skill-chip">{{ label() }}</span>`,
  styleUrl: './skill-chip.component.scss',
})
export class SkillChipComponent {
  readonly label = input('');
}
