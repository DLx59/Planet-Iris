import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TranslocoModule } from '@jsverse/transloco';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { BreadcrumbComponent } from '../../components/breadcrumb/breadcrumb.component';
import { FooterComponent } from '../../components/footer/footer.component';

@Component({
  selector: 'app-mentions-legales',
  standalone: true,
  imports: [TranslocoModule, NavbarComponent, BreadcrumbComponent, FooterComponent],
  templateUrl: './mentions-legales.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MentionsLegalesComponent {}
