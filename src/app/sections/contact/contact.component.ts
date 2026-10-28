import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CvService } from '../../core/services/cv.service';
import { ScrollRevealDirective } from '../../shared/directives/scroll-reveal.directive';
import { SectionTitleComponent } from '../../shared/section-title/section-title.component';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [SectionTitleComponent, ScrollRevealDirective, FormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
})
export class ContactComponent {
  protected readonly cv = inject(CvService);
  private readonly http = inject(HttpClient);

  protected readonly copied = signal<string | null>(null);
  private copyTimer: ReturnType<typeof setTimeout> | undefined;

  protected form = {
    name: '',
    email: '',
    message: '',
  };

  protected sending = signal(false);
  protected sent = signal(false);
  protected error = signal(false);

  protected whatsappNumber(): string {
    const phone = this.cv.profile().phone ?? '';
    return phone.replace(/[^0-9]/g, '');
  }

  protected whatsappMessage(): string {
    const message = `Hola César, me gustaría hablar contigo sobre un proyecto.`;
    return encodeURIComponent(message);
  }

  protected sendMail(): void {
    if (this.sending()) {
      return;
    }

    this.sending.set(true);
    this.sent.set(false);
    this.error.set(false);

    const payload = {
      name: this.form.name,
      email: this.form.email,
      message: this.form.message,
      _subject: `Nuevo mensaje desde tu portfolio - ${this.form.name}`,
      _replyto: this.form.email,
      _captcha: 'false',
    };

    this.http
      .post('https://formsubmit.co/ajax/calfonsomora@gmail.com', payload, {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      })
      .subscribe({
        next: () => {
          this.sending.set(false);
          this.sent.set(true);
          this.form = {
            name: '',
            email: '',
            message: '',
          };
          setTimeout(() => this.sent.set(false), 5000);
        },
        error: () => {
          this.sending.set(false);
          this.error.set(true);
          setTimeout(() => this.error.set(false), 5000);
        },
      });
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
