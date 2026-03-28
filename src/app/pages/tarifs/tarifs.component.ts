import { ChangeDetectionStrategy, Component, DestroyRef, afterNextRender, inject } from '@angular/core';
import { TranslocoModule } from '@jsverse/transloco';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { BreadcrumbComponent } from '../../components/breadcrumb/breadcrumb.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { TarifService } from '../../services/tarif.service';
import { AnimationService } from '../../services/animation.service';
import { PageTitleService } from '../../services/page-title.service';

@Component({
  selector: 'app-tarifs',
  standalone: true,
  imports: [TranslocoModule, NavbarComponent, BreadcrumbComponent, FooterComponent],
  templateUrl: './tarifs.component.html',
  styleUrl: './tarifs.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TarifsComponent {
  private tarifService = inject(TarifService);
  private animationService = inject(AnimationService);
  private destroyRef = inject(DestroyRef);

  readonly tarifs = this.tarifService.getTarifs();

  constructor() {
    inject(PageTitleService).set('page-title.tarifs');

    afterNextRender(() => {
      this.animationService.initFadeInOnScroll();

      this.destroyRef.onDestroy(() => {
        this.animationService.destroyAll();
      });
    });
  }
}
