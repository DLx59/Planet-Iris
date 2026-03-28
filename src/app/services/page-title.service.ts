import {DestroyRef, inject, Injectable} from '@angular/core';
import {DOCUMENT} from '@angular/common';
import {Meta, Title} from '@angular/platform-browser';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {TranslocoService} from '@jsverse/transloco';

@Injectable({providedIn: 'root'})
export class PageTitleService {
  private title = inject(Title);
  private transloco = inject(TranslocoService);

  set(key: string): void {
    const destroyRef = inject(DestroyRef);
    this.transloco
      .selectTranslate(key)
      .pipe(takeUntilDestroyed(destroyRef))
      .subscribe(t => this.title.setTitle(t));
  }

  setDescription(key: string): void {
    const destroyRef = inject(DestroyRef);
    const meta = inject(Meta);
    this.transloco
      .selectTranslate(key)
      .pipe(takeUntilDestroyed(destroyRef))
      .subscribe(description => meta.updateTag({name: 'description', content: description}));
  }

  setCanonical(path: string): void {
    const document = inject(DOCUMENT);
    const link = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (link) link.href = `https://www.planet-iris.com${path}`;
  }
}
