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
  selector: 'app-photo-iris-hainaut',
  standalone: true,
  imports: [NavbarComponent, BreadcrumbComponent, FooterComponent, ArticleHeroComponent, ArticleSectionComponent, ArticleCtaComponent, ArticleRelatedComponent],
  templateUrl: './photo-iris-hainaut.component.html',
  styleUrl: './photo-iris-hainaut.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PhotoIrisHainautComponent {
  private animationService = inject(AnimationService);
  private articleStatusService = inject(ArticleStatusService);
  private destroyRef = inject(DestroyRef);

  readonly hero: ArticleHero = {
    tagKey: 'article-hainaut.tag',
    titleKey: 'article-hainaut.hero-title',
    introKey: 'article-hainaut.hero-intro',
    readingTimeKey: 'article-hainaut.reading-time',
    publishedKey: 'article-hainaut.published',
  };

  readonly sections: ArticleSection[] = [
    { titleKey: 'article-hainaut.s1-title', paragraphKeys: ['article-hainaut.s1-p1', 'article-hainaut.s1-p2'] },
    { titleKey: 'article-hainaut.s2-title', paragraphKeys: ['article-hainaut.s2-p1', 'article-hainaut.s2-p2'] },
    { titleKey: 'article-hainaut.s3-title', paragraphKeys: ['article-hainaut.s3-p1', 'article-hainaut.s3-p2'] },
    { titleKey: 'article-hainaut.s4-title', paragraphKeys: ['article-hainaut.s4-p1', 'article-hainaut.s4-p2'] },
  ];

  readonly cta: ArticleCta = {
    titleKey: 'article-hainaut.cta-title',
    descKey: 'article-hainaut.cta-desc',
  };

  constructor() {
    const pageTitleService = inject(PageTitleService);
    pageTitleService.set('page-title.article-hainaut');
    pageTitleService.setDescription('article-hainaut.meta-desc');
    pageTitleService.setCanonical('/blog/photo-iris-hainaut');

    afterNextRender(() => {
      this.articleStatusService.markAsRead('photo-iris-hainaut');
      this.animationService.initFadeInOnScroll();
      this.destroyRef.onDestroy(() => this.animationService.destroyAll());
    });
  }
}
