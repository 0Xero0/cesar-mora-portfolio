import { Component, inject } from '@angular/core';
import { CvService } from '../../core/services/cv.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {
  protected readonly cv = inject(CvService);
  protected readonly year = new Date().getFullYear();
}
