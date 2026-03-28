import { ChangeDetectionStrategy, Component, DestroyRef, inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TranslocoModule, TranslocoService } from '@jsverse/transloco';
import { getBusinessSchema } from './schemas/business.schema';
import { getFaqSchema } from './schemas/faq.schema';
import { getArticleCataracteSchema } from './schemas/article-cataracte.schema';
import { getArticleMarronsSchema } from './schemas/article-marrons.schema';
import { SchemaService } from './services/schema.service';
import { SupportedLang } from './models/article.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TranslocoModule],
  template: `
    <a href="#main-content" class="skip-link" transloco="nav.skip-content"></a>
    <router-outlet />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  constructor() {
    const document = inject(DOCUMENT);
    const transloco = inject(TranslocoService);
    const schemaService = inject(SchemaService);
    const destroyRef = inject(DestroyRef);

    const activeLang = transloco.getActiveLang() as SupportedLang;
    document.documentElement.lang = activeLang;

    schemaService.inject(getBusinessSchema(activeLang), 'schema-business');
    schemaService.inject(getFaqSchema(activeLang), 'schema-faq');
    schemaService.inject(getArticleCataracteSchema(activeLang), 'schema-article-cataracte');
    schemaService.inject(getArticleMarronsSchema(activeLang), 'schema-article-marrons');

    transloco.langChanges$
      .pipe(takeUntilDestroyed(destroyRef))
      .subscribe(lang => {
        const l = lang as SupportedLang;
        document.documentElement.lang = l;
        schemaService.update('schema-business', getBusinessSchema(l));
        schemaService.update('schema-faq', getFaqSchema(l));
        schemaService.update('schema-article-cataracte', getArticleCataracteSchema(l));
        schemaService.update('schema-article-marrons', getArticleMarronsSchema(l));
      });
  }
}
