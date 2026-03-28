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
  selector: 'app-familles-meme-couleur-yeux',
  standalone: true,
  imports: [NavbarComponent, BreadcrumbComponent, FooterComponent, ArticleHeroComponent, ArticleSectionComponent, ArticleCtaComponent, ArticleRelatedComponent],
  templateUrl: './familles-meme-couleur-yeux.component.html',
  styleUrl: './familles-meme-couleur-yeux.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FamillesMemeCouleurYeuxComponent {
  private animationService = inject(AnimationService);
  private articleStatusService = inject(ArticleStatusService);
  private destroyRef = inject(DestroyRef);

  readonly hero: ArticleHero = {
    tagKey: 'article-famille-couleur.tag',
    titleKey: 'article-famille-couleur.hero-title',
    introKey: 'article-famille-couleur.hero-intro',
    readingTimeKey: 'article-famille-couleur.reading-time',
    publishedKey: 'article-famille-couleur.published',
  };

  readonly sections: ArticleSection[] = [
    { titleKey: 'article-famille-couleur.s1-title', paragraphKeys: ['article-famille-couleur.s1-p1', 'article-famille-couleur.s1-p2'] },
    { titleKey: 'article-famille-couleur.s2-title', paragraphKeys: ['article-famille-couleur.s2-p1', 'article-famille-couleur.s2-p2'] },
    { titleKey: 'article-famille-couleur.s3-title', paragraphKeys: ['article-famille-couleur.s3-p1', 'article-famille-couleur.s3-p2'] },
    { titleKey: 'article-famille-couleur.s4-title', paragraphKeys: ['article-famille-couleur.s4-p1', 'article-famille-couleur.s4-p2'] },
  ];

  readonly cta: ArticleCta = {
    titleKey: 'article-famille-couleur.cta-title',
    descKey: 'article-famille-couleur.cta-desc',
  };

  constructor() {
    const pageTitleService = inject(PageTitleService);
    pageTitleService.set('page-title.article-famille-couleur');
    pageTitleService.setDescription('article-famille-couleur.meta-desc');
    pageTitleService.setCanonical('/blog/familles-meme-couleur-yeux');

    afterNextRender(() => {
      this.articleStatusService.markAsRead('familles-meme-couleur-yeux');
      this.animationService.initFadeInOnScroll();
      this.destroyRef.onDestroy(() => this.animationService.destroyAll());
    });
  }
}
