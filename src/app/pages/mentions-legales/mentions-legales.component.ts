import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { TranslocoModule } from '@jsverse/transloco';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { BreadcrumbComponent } from '../../components/breadcrumb/breadcrumb.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { PageTitleService } from '../../services/page-title.service';

@Component({
  selector: 'app-mentions-legales',
  standalone: true,
  imports: [TranslocoModule, NavbarComponent, BreadcrumbComponent, FooterComponent],
  templateUrl: './mentions-legales.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MentionsLegalesComponent {
  constructor() {
    inject(PageTitleService).set('page-title.mentions-legales');
  }
}
