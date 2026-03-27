import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent {
  menuOpen = signal(false);

  navLinks = [
    { routerLink: '/', label: 'Accueil', exact: true },
    { routerLink: '/services', label: 'Services', exact: false },
    { routerLink: '/tarifs', label: 'Tarifs', exact: false },
  ];

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
}
