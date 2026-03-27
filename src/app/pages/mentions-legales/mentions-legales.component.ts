import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { BreadcrumbComponent } from '../../components/breadcrumb/breadcrumb.component';
import { FooterComponent } from '../../components/footer/footer.component';

@Component({
  selector: 'app-mentions-legales',
  standalone: true,
  imports: [NavbarComponent, BreadcrumbComponent, FooterComponent],
  templateUrl: './mentions-legales.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MentionsLegalesComponent {}
