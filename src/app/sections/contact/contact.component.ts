import { Component, inject, signal } from '@angular/core';
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

  protected readonly copied = signal<string | null>(null);

  private copyTimer: ReturnType<typeof setTimeout> | undefined;

  protected whatsappNumber(): string {
    const phone = this.cv.profile().phone ?? '';
    return phone.replace(/[^0-9]/g, '');
  }

  protected whatsappMessage(): string {
    const message = `Hola César, me gustaría hablar contigo sobre un proyecto.`;
    return encodeURIComponent(message);
  }

  async copy(value: string | undefined): Promise<void> {
    if (!value) {
      return;
    }
    try {
      await navigator.clipboard.writeText(value);
      this.markCopied(value);
    } catch {
      this.fallbackCopy(value);
    }
  }

  private markCopied(value: string): void {
    this.copied.set(value);
    clearTimeout(this.copyTimer);
    this.copyTimer = setTimeout(() => this.copied.set(null), 2000);
  }

  private fallbackCopy(value: string): void {
    const textarea = document.createElement('textarea');
    textarea.value = value;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    this.markCopied(value);
  }
}
