import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslocoModule } from '@jsverse/transloco';
import { ArticleTeaserService } from '../../services/article-teaser.service';

@Component({
  selector: 'app-article-teaser-section',
  standalone: true,
  imports: [RouterLink, TranslocoModule],
  templateUrl: './article-teaser-section.component.html',
  styleUrl: './article-teaser-section.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticleTeaserSectionComponent {
  readonly teasers = inject(ArticleTeaserService).teasers;
}
