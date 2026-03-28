import { Injectable, computed, inject } from '@angular/core';
import { ArticleStatusService } from './article-status.service';
import { BLOG_POSTS } from '../pages/blog/blog.posts';
import { ArticleTeaserPost } from '../models/article.model';

const MAX_TEASERS = 3;

@Injectable({ providedIn: 'root' })
export class ArticleTeaserService {
  private articleStatusService = inject(ArticleStatusService);

  /**
   * Les MAX_TEASERS articles les plus récents non encore lus,
   * triés du plus récent au plus ancien.
   * Signal réactif : se met à jour automatiquement quand un article est lu.
   */
  readonly teasers = computed<ArticleTeaserPost[]>(() =>
    [...BLOG_POSTS]
      .sort((a, b) => b.date.getTime() - a.date.getTime())
      .reduce<ArticleTeaserPost[]>((acc, post) => {
        if (acc.length >= MAX_TEASERS) return acc;
        const status = this.articleStatusService.getStatus(post.slug);
        if (status !== 'read') {
          acc.push({ ...post, status });
        }
        return acc;
      }, [])
  );
}
