import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NavbarDesktopComponent } from './navbar-desktop.component';
import { NavbarMobileComponent } from './navbar-mobile.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [NavbarDesktopComponent, NavbarMobileComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent {}
