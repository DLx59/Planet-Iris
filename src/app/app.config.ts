import {ApplicationConfig, inject, Injectable, isDevMode, provideZoneChangeDetection} from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import {HttpClient, provideHttpClient} from '@angular/common/http';
import {provideTransloco, TranslocoLoader} from '@jsverse/transloco';
import { routes } from './app.routes';

@Injectable({ providedIn: 'root' })
export class TranslocoHttpLoader implements TranslocoLoader {
  private http = inject(HttpClient);
  getTranslation(lang: string) {
    return this.http.get<Record<string, unknown>>(`/assets/i18n/${lang}.json`);
  }
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withInMemoryScrolling({ anchorScrolling: 'enabled', scrollPositionRestoration: 'top' })),
    provideHttpClient(),
    provideTransloco({
      config: {
        availableLangs: ['fr', 'en', 'nl'],
        defaultLang: 'fr',
        reRenderOnLangChange: true,
        prodMode: !isDevMode(),
      },
      loader: TranslocoHttpLoader,
    }),
  ],
};
