import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TranslocoModule, TranslocoService } from '@jsverse/transloco';

interface LangOption {
  code: string;
  display: string;
  label: string;
}

const LANG_OPTIONS: LangOption[] = [
  { code: 'fr', display: 'FR', label: 'Français' },
  { code: 'en', display: 'EN', label: 'English' },
  { code: 'nl', display: 'NL', label: 'Nederlands' },
];

const STORED_LANG_KEY = 'planet-iris-lang';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, TranslocoModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent {
  private transloco = inject(TranslocoService);

  menuOpen = signal(false);

  readonly langOptions = LANG_OPTIONS;
  activeLang = signal(this.getInitialLang());

  navLinks = [
    { routerLink: '/', labelKey: 'nav.home', exact: true },
    { routerLink: '/services', labelKey: 'nav.services', exact: false },
    { routerLink: '/tarifs', labelKey: 'nav.tarifs', exact: false },
  ];

  private getInitialLang(): string {
    const stored = typeof localStorage !== 'undefined' ? localStorage.getItem(STORED_LANG_KEY) : null;
    return stored ?? 'fr';
  }

  onNavbarMouseMove(event: MouseEvent): void {
    const target = event.currentTarget as HTMLElement;
    const x = event.clientX - target.offsetLeft;
    const y = event.clientY - target.offsetTop;
    target.style.setProperty('--x', `${x}px`);
    target.style.setProperty('--y', `${y}px`);
  }

  toggleMenu(): void {
    this.menuOpen.update(v => !v);
  }

  setLang(code: string): void {
    this.transloco.setActiveLang(code);
    this.activeLang.set(code);
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(STORED_LANG_KEY, code);
    }
  }
}
