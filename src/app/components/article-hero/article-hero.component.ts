import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { TranslocoModule } from '@jsverse/transloco';
import { ArticleHero } from '../../models/article.model';

@Component({
  selector: 'app-article-hero',
  standalone: true,
  imports: [TranslocoModule],
  templateUrl: './article-hero.component.html',
  styleUrl: './article-hero.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticleHeroComponent {
  hero = input.required<ArticleHero>();
}
