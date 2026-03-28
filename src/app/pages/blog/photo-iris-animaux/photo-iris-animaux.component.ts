import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  afterNextRender,
  inject,
} from '@angular/core';
import { NavbarComponent } from '../../../components/navbar/navbar.component';
import { BreadcrumbComponent } from '../../../components/breadcrumb/breadcrumb.component';
import { FooterComponent } from '../../../components/footer/footer.component';
import { ArticleHeroComponent } from '../../../components/article-hero/article-hero.component';
import { ArticleSectionComponent } from '../../../components/article-section/article-section.component';
import { ArticleCtaComponent } from '../../../components/article-cta/article-cta.component';
import { ArticleRelatedComponent } from '../../../components/article-related/article-related.component';
import { AnimationService } from '../../../services/animation.service';
import { ArticleStatusService } from '../../../services/article-status.service';
import { PageTitleService } from '../../../services/page-title.service';
import { ArticleCta, ArticleHero, ArticleSection } from '../../../models/article.model';

@Component({
  selector: 'app-photo-iris-animaux',
  standalone: true,
  imports: [NavbarComponent, BreadcrumbComponent, FooterComponent, ArticleHeroComponent, ArticleSectionComponent, ArticleCtaComponent, ArticleRelatedComponent],
  templateUrl: './photo-iris-animaux.component.html',
  styleUrl: './photo-iris-animaux.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PhotoIrisAnimauxComponent {
  private animationService = inject(AnimationService);
  private articleStatusService = inject(ArticleStatusService);
  private destroyRef = inject(DestroyRef);

  readonly hero: ArticleHero = {
    tagKey: 'article-animaux.tag',
    titleKey: 'article-animaux.hero-title',
    introKey: 'article-animaux.hero-intro',
    readingTimeKey: 'article-animaux.reading-time',
    publishedKey: 'article-animaux.published',
  };

  readonly sections: ArticleSection[] = [
    { titleKey: 'article-animaux.s1-title', paragraphKeys: ['article-animaux.s1-p1', 'article-animaux.s1-p2'] },
    { titleKey: 'article-animaux.s2-title', paragraphKeys: ['article-animaux.s2-p1', 'article-animaux.s2-p2'] },
    { titleKey: 'article-animaux.s3-title', paragraphKeys: ['article-animaux.s3-p1', 'article-animaux.s3-p2'] },
    { titleKey: 'article-animaux.s4-title', paragraphKeys: ['article-animaux.s4-p1', 'article-animaux.s4-p2'] },
  ];

  readonly cta: ArticleCta = {
    titleKey: 'article-animaux.cta-title',
    descKey: 'article-animaux.cta-desc',
  };

  constructor() {
    const pageTitleService = inject(PageTitleService);
    pageTitleService.set('page-title.article-animaux');
    pageTitleService.setDescription('article-animaux.meta-desc');
    pageTitleService.setCanonical('/blog/photo-iris-animaux');

    afterNextRender(() => {
      this.articleStatusService.markAsRead('photo-iris-animaux');
      this.animationService.initFadeInOnScroll();
      this.destroyRef.onDestroy(() => this.animationService.destroyAll());
    });
  }
}
