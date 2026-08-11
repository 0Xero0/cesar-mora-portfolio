import { Injectable, computed, signal } from '@angular/core';
import cvData from '../../../assets/data/cv.json';
import { CvProfile } from '../models/cv.model';

const MONTHS = [
  'Ene',
  'Feb',
  'Mar',
  'Abr',
  'May',
  'Jun',
  'Jul',
  'Ago',
  'Sep',
  'Oct',
  'Nov',
  'Dic',
];

@Injectable({ providedIn: 'root' })
export class CvService {
  readonly profile = signal<CvProfile>(cvData as CvProfile);

  readonly linkedInUrl = computed(() => this.socialUrl('linkedin'));

  readonly githubUrl = computed(() => this.socialUrl('github'));

  readonly websiteUrl = computed(() => this.profile()?.website ?? null);

  readonly githubUsername = computed(() => {
    const github = this.profile()?.social_networks?.find(
      (item) => item.network.toLowerCase() === 'github',
    );
    return github ? `@${github.username}` : '';
  });

  private socialUrl(network: string): string | null {
    const profile = this.profile()?.social_networks?.find(
      (item) => item.network.toLowerCase() === network,
    );

    if (!profile) {
      return null;
    }

    if (network === 'linkedin') {
      return `https://linkedin.com/in/${profile.username}`;
    }

    if (network === 'github') {
      return `https://github.com/${profile.username}`;
    }

    return null;
  }

  readonly displayName = computed(
    () => this.profile()?.display_name ?? this.profile()?.name ?? 'César Mora',
  );

  readonly firstName = computed(
    () => this.displayName().split(' ')[0] ?? 'César',
  );

  readonly summary = computed(() => this.profile()?.sections?.summary?.[0] ?? '');

  readonly experience = computed(() => this.profile()?.sections?.experience ?? []);

  readonly education = computed(() => this.profile()?.sections?.education ?? []);

  readonly certifications = computed(
    () => this.profile()?.sections?.certifications ?? [],
  );

  readonly skills = computed(() => this.profile()?.sections?.skills ?? []);

  readonly projects = computed(() => this.profile()?.sections?.projects ?? []);

  formatDate(value?: string | null): string {
    if (!value || value === 'present') {
      return 'Actualidad';
    }

    const [year, month] = value.split('-');
    if (!year || !month) {
      return value;
    }

    const monthIndex = Number(month) - 1;
    if (monthIndex < 0 || monthIndex > 11) {
      return value;
    }

    return `${MONTHS[monthIndex]} ${year}`;
  }

  formatDateRange(start?: string, end?: string | null): string {
    const startLabel = start ? this.formatDate(start) : '';
    const endLabel = this.formatDate(end);

    if (!startLabel) {
      return endLabel;
    }

    return `${startLabel} – ${endLabel}`;
  }

  splitSkills(details: string): string[] {
    return details
      .split(',')
      .map((item) => item.trim())
      .filter(Boolean);
  }
}
