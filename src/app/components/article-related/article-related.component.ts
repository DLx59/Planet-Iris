import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslocoModule } from '@jsverse/transloco';
import { BlogPost } from '../../models/article.model';
import { BLOG_POSTS } from '../../pages/blog/blog.posts';
import { BLOG_RELATIONS } from '../../pages/blog/blog.relations';

@Component({
  selector: 'app-article-related',
  standalone: true,
  imports: [RouterLink, TranslocoModule],
  templateUrl: './article-related.component.html',
  styleUrl: './article-related.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticleRelatedComponent {
  readonly slug = input.required<string>();

  readonly relatedPosts = computed<BlogPost[]>(() => {
    const relatedSlugs = BLOG_RELATIONS[this.slug()] ?? [];
    return relatedSlugs
      .map(s => BLOG_POSTS.find(p => p.slug === s))
      .filter((p): p is BlogPost => p !== undefined);
  });
}
