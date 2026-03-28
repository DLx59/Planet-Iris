import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  afterNextRender,
  computed,
  inject,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { TranslocoModule, TranslocoService } from '@jsverse/transloco';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { BreadcrumbComponent } from '../../components/breadcrumb/breadcrumb.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { AnimationService } from '../../services/animation.service';
import { ArticleStatusService } from '../../services/article-status.service';
import { PageTitleService } from '../../services/page-title.service';
import { BLOG_POSTS } from './blog.posts';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [RouterLink, DatePipe, TranslocoModule, NavbarComponent, BreadcrumbComponent, FooterComponent],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BlogComponent {
  private animationService = inject(AnimationService);
  private articleStatusService = inject(ArticleStatusService);
  private translocoService = inject(TranslocoService);
  private destroyRef = inject(DestroyRef);

  readonly activeLang = toSignal(this.translocoService.langChanges$, { initialValue: this.translocoService.getActiveLang() });

  readonly postsWithStatus = computed(() =>
    [...BLOG_POSTS]
      .sort((a, b) => b.date.getTime() - a.date.getTime())
      .map(p => ({ ...p, status: this.articleStatusService.getStatus(p.slug) }))
  );

  constructor() {
    inject(PageTitleService).set('page-title.blog');

    afterNextRender(() => {
      this.animationService.initFadeInOnScroll();
      this.destroyRef.onDestroy(() => this.animationService.destroyAll());
    });
  }
}
