import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslocoModule } from '@jsverse/transloco';
import { ArticleCta } from '../../models/article.model';

@Component({
  selector: 'app-article-cta',
  standalone: true,
  imports: [RouterLink, TranslocoModule],
  templateUrl: './article-cta.component.html',
  styleUrl: './article-cta.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticleCtaComponent {
  cta = input.required<ArticleCta>();
}
