import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { TranslocoModule } from '@jsverse/transloco';
import { ArticleSection } from '../../models/article.model';

@Component({
  selector: 'app-article-section',
  standalone: true,
  imports: [TranslocoModule],
  templateUrl: './article-section.component.html',
  styleUrl: './article-section.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticleSectionComponent {
  section = input.required<ArticleSection>();
}
