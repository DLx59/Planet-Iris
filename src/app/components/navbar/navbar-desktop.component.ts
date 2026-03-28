import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TranslocoModule, TranslocoService } from '@jsverse/transloco';

interface LangOption { code: string; display: string; label: string; }

const LANG_OPTIONS: LangOption[] = [
  { code: 'fr', display: 'FR', label: 'Français' },
  { code: 'en', display: 'EN', label: 'English' },
  { code: 'nl', display: 'NL', label: 'Nederlands' },
];

const STORED_LANG_KEY = 'planet-iris-lang';

@Component({
  selector: 'app-navbar-desktop',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, TranslocoModule],
  templateUrl: './navbar-desktop.component.html',
  styleUrl: './navbar-desktop.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarDesktopComponent {
  private transloco = inject(TranslocoService);

  readonly langOptions = LANG_OPTIONS;
  activeLang = signal(this.getInitialLang());

  readonly navLinks = [
    { routerLink: '/', labelKey: 'nav.home', exact: true },
    { routerLink: '/services', labelKey: 'nav.services', exact: false },
    { routerLink: '/tarifs', labelKey: 'nav.tarifs', exact: false },
    { routerLink: '/blog', labelKey: 'nav.blog', exact: false },
  ];

  constructor() {
    this.transloco.setActiveLang(this.activeLang());
  }

  private getInitialLang(): string {
    if (typeof localStorage !== 'undefined') {
      const stored = localStorage.getItem(STORED_LANG_KEY);
      if (stored) return stored;
    }
    if (typeof navigator !== 'undefined') {
      const supported = ['fr', 'en', 'nl'];
      const preferred = Array.from(navigator.languages ?? [navigator.language]);
      for (const lang of preferred) {
        const code = lang.split('-')[0].toLowerCase();
        if (supported.includes(code)) return code;
      }
    }
    return 'fr';
  }

  onMouseMove(event: MouseEvent): void {
    const target = event.currentTarget as HTMLElement;
    const x = event.clientX - target.offsetLeft;
    const y = event.clientY - target.offsetTop;
    target.style.setProperty('--x', `${x}px`);
    target.style.setProperty('--y', `${y}px`);
  }

  setLang(code: string): void {
    this.transloco.setActiveLang(code);
    this.activeLang.set(code);
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(STORED_LANG_KEY, code);
    }
  }
}
