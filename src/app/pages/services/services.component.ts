import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  afterNextRender,
  inject,
} from '@angular/core';
import { TranslocoModule } from '@jsverse/transloco';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { BreadcrumbComponent } from '../../components/breadcrumb/breadcrumb.component';
import { VosIrisSectionComponent } from '../../components/vos-iris-section/vos-iris-section.component';
import { TarifSectionComponent } from '../../components/tarif-section/tarif-section.component';
import { FaqSectionComponent } from '../../components/faq-section/faq-section.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { AnimationService } from '../../services/animation.service';
import { PageTitleService } from '../../services/page-title.service';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [
    TranslocoModule,
    NavbarComponent,
    BreadcrumbComponent,
    VosIrisSectionComponent,
    TarifSectionComponent,
    FaqSectionComponent,
    FooterComponent,
  ],
  templateUrl: './services.component.html',
  styleUrl: './services.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ServicesComponent {
  private animationService = inject(AnimationService);
  private destroyRef = inject(DestroyRef);

  constructor() {
    inject(PageTitleService).set('page-title.services');

    afterNextRender(() => {
      this.animationService.initFadeInOnScroll();
      this.destroyRef.onDestroy(() => this.animationService.destroyAll());
    });
  }
}
