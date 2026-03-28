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
  selector: 'app-photo-iris-cataracte',
  standalone: true,
  imports: [NavbarComponent, BreadcrumbComponent, FooterComponent, ArticleHeroComponent, ArticleSectionComponent, ArticleCtaComponent, ArticleRelatedComponent],
  templateUrl: './photo-iris-cataracte.component.html',
  styleUrl: './photo-iris-cataracte.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PhotoIrisCataracteComponent {
  private animationService = inject(AnimationService);
  private articleStatusService = inject(ArticleStatusService);
  private destroyRef = inject(DestroyRef);

  readonly hero: ArticleHero = {
    tagKey: 'article-cataracte.tag',
    titleKey: 'article-cataracte.hero-title',
    introKey: 'article-cataracte.hero-intro',
    readingTimeKey: 'article-cataracte.reading-time',
    publishedKey: 'article-cataracte.published',
  };

  readonly sections: ArticleSection[] = [
    { titleKey: 'article-cataracte.s1-title', paragraphKeys: ['article-cataracte.s1-p1', 'article-cataracte.s1-p2'] },
    { titleKey: 'article-cataracte.s2-title', paragraphKeys: ['article-cataracte.s2-p1', 'article-cataracte.s2-p2'] },
    { titleKey: 'article-cataracte.s3-title', paragraphKeys: ['article-cataracte.s3-p1', 'article-cataracte.s3-p2'] },
    { titleKey: 'article-cataracte.s4-title', paragraphKeys: ['article-cataracte.s4-p1', 'article-cataracte.s4-p2'] },
  ];

  readonly cta: ArticleCta = {
    titleKey: 'article-cataracte.cta-title',
    descKey: 'article-cataracte.cta-desc',
  };

  constructor() {
    const pageTitleService = inject(PageTitleService);
    pageTitleService.set('page-title.article-cataracte');
    pageTitleService.setDescription('article-cataracte.meta-desc');
    pageTitleService.setCanonical('/blog/photo-iris-cataracte');

    afterNextRender(() => {
      this.articleStatusService.markAsRead('photo-iris-cataracte');
      this.animationService.initFadeInOnScroll();
      this.destroyRef.onDestroy(() => this.animationService.destroyAll());
    });
  }
}
