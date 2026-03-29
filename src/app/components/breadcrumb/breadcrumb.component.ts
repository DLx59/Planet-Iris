import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { TranslocoModule } from '@jsverse/transloco';
import { filter, map } from 'rxjs';

interface BreadcrumbItem {
  labelKey: string;
  path: string;
  current: boolean;
}

const ROUTE_KEYS: Record<string, string> = {
  'services': 'breadcrumb.services',
  'tarifs': 'breadcrumb.tarifs',
  'contact': 'breadcrumb.contact',
  'mentions-legales': 'breadcrumb.mentions-legales',
  'politique-de-confidentialite': 'breadcrumb.politique-de-confidentialite',
  'blog': 'breadcrumb.blog',
  'photo-iris-cataracte': 'breadcrumb.photo-iris-cataracte',
  'iris-yeux-marrons': 'breadcrumb.iris-yeux-marrons',
  'photo-iris-animaux': 'breadcrumb.photo-iris-animaux',
  'familles-meme-couleur-yeux': 'breadcrumb.familles-meme-couleur-yeux',
  'photo-iris-hainaut': 'breadcrumb.photo-iris-hainaut',
};

@Component({
  selector: 'app-breadcrumb',
  standalone: true,
  imports: [RouterLink, TranslocoModule],
  templateUrl: './breadcrumb.component.html',
  styleUrl: './breadcrumb.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BreadcrumbComponent {
  private router = inject(Router);

  private url = toSignal(
    this.router.events.pipe(
      filter((e): e is NavigationEnd => e instanceof NavigationEnd),
      map(e => e.urlAfterRedirects),
    ),
    { initialValue: this.router.url },
  );

  items = computed<BreadcrumbItem[]>(() => {
    const segments = this.url().split('/').filter(Boolean);
    const crumbs: BreadcrumbItem[] = [
      { labelKey: 'breadcrumb.home', path: '/', current: segments.length === 0 },
    ];

    let currentPath = '';
    segments.forEach((segment, i) => {
      currentPath += '/' + segment;
      crumbs.push({
        labelKey: ROUTE_KEYS[segment] ?? segment,
        path: currentPath,
        current: i === segments.length - 1,
      });
    });

    return crumbs;
  });
}
