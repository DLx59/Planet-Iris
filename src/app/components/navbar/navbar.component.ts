import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent {
  menuOpen = signal(false);

  navLinks = [
    { href: '#presentation', label: 'Présentation' },
    { href: '#vos-iris', label: 'Vos iris' },
    { href: '#tarif', label: 'Tarif' },
    { href: '#avis', label: 'Avis' },
    { href: '#faq', label: 'FAQ' },
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
