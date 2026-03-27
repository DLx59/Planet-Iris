import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TranslocoModule } from '@jsverse/transloco';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { BreadcrumbComponent } from '../../components/breadcrumb/breadcrumb.component';
import { FooterComponent } from '../../components/footer/footer.component';

@Component({
  selector: 'app-politique-confidentialite',
  standalone: true,
  imports: [TranslocoModule, NavbarComponent, BreadcrumbComponent, FooterComponent],
  templateUrl: './politique-confidentialite.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PolitiqueConfidentialiteComponent {}
