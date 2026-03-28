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
  selector: 'app-iris-yeux-marrons',
  standalone: true,
  imports: [NavbarComponent, BreadcrumbComponent, FooterComponent, ArticleHeroComponent, ArticleSectionComponent, ArticleCtaComponent, ArticleRelatedComponent],
  templateUrl: './iris-yeux-marrons.component.html',
  styleUrl: './iris-yeux-marrons.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IrisYeuxMarronsComponent {
  private animationService = inject(AnimationService);
  private articleStatusService = inject(ArticleStatusService);
  private destroyRef = inject(DestroyRef);

  readonly hero: ArticleHero = {
    tagKey: 'article-marrons.tag',
    titleKey: 'article-marrons.hero-title',
    introKey: 'article-marrons.hero-intro',
    readingTimeKey: 'article-marrons.reading-time',
    publishedKey: 'article-marrons.published',
  };

  readonly sections: ArticleSection[] = [
    { titleKey: 'article-marrons.s1-title', paragraphKeys: ['article-marrons.s1-p1', 'article-marrons.s1-p2'] },
    { titleKey: 'article-marrons.s2-title', paragraphKeys: ['article-marrons.s2-p1', 'article-marrons.s2-p2'] },
    { titleKey: 'article-marrons.s3-title', paragraphKeys: ['article-marrons.s3-p1', 'article-marrons.s3-p2'] },
    { titleKey: 'article-marrons.s4-title', paragraphKeys: ['article-marrons.s4-p1', 'article-marrons.s4-p2'] },
  ];

  readonly cta: ArticleCta = {
    titleKey: 'article-marrons.cta-title',
    descKey: 'article-marrons.cta-desc',
  };

  constructor() {
    const pageTitleService = inject(PageTitleService);
    pageTitleService.set('page-title.article-marrons');
    pageTitleService.setDescription('article-marrons.meta-desc');
    pageTitleService.setCanonical('/blog/iris-yeux-marrons');

    afterNextRender(() => {
      this.articleStatusService.markAsRead('iris-yeux-marrons');
      this.animationService.initFadeInOnScroll();
      this.destroyRef.onDestroy(() => this.animationService.destroyAll());
    });
  }
}
