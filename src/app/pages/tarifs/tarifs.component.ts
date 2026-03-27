import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { BreadcrumbComponent } from '../../components/breadcrumb/breadcrumb.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { TarifService } from '../../services/tarif.service';
import { SupportEntry } from '../../models/tarif.model';

@Component({
  selector: 'app-tarifs',
  standalone: true,
  imports: [CommonModule, NavbarComponent, BreadcrumbComponent, FooterComponent],
  templateUrl: './tarifs.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TarifsComponent {
  private tarifService = inject(TarifService);
  tarifs = toSignal(this.tarifService.getTarifs(), { initialValue: [] as SupportEntry[] });
}
