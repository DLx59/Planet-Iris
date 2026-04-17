import { mergeApplicationConfig, ApplicationConfig, inject, Injectable } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { Observable, of } from 'rxjs';
import { readFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { TranslocoLoader, TRANSLOCO_LOADER } from '@jsverse/transloco';
import { BROWSER_DIST_FOLDER } from './tokens/ssr.tokens';
import { appConfig } from './app.config';

const serverDir = dirname(fileURLToPath(import.meta.url));
const browserDistFolder = resolve(serverDir, '../browser');

@Injectable()
class ServerTranslocoLoader implements TranslocoLoader {
  private readonly distFolder = inject(BROWSER_DIST_FOLDER);

  getTranslation(lang: string): Observable<Record<string, unknown>> {
    const filePath = join(this.distFolder, 'assets', 'i18n', `${lang}.json`);
    const content = readFileSync(filePath, 'utf-8');
    return of(JSON.parse(content) as Record<string, unknown>);
  }
}

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(),
    { provide: BROWSER_DIST_FOLDER, useValue: browserDistFolder },
    { provide: TRANSLOCO_LOADER, useClass: ServerTranslocoLoader },
  ],
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
