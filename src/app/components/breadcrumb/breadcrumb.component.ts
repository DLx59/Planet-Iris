import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { filter, map } from 'rxjs';

const ROUTE_LABELS: Record<string, string> = {
  'services': 'Services',
  'tarifs': 'Tarifs',
  'contact': 'Contact',
  'mentions-legales': 'Mentions légales',
  'politique-de-confidentialite': 'Politique de confidentialité',
};

interface BreadcrumbItem {
  label: string;
  path: string;
  current: boolean;
}

@Component({
  selector: 'app-breadcrumb',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './breadcrumb.component.html',
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
      { label: 'Accueil', path: '/', current: segments.length === 0 },
    ];

    let currentPath = '';
    segments.forEach((segment, i) => {
      currentPath += '/' + segment;
      crumbs.push({
        label: ROUTE_LABELS[segment] ?? segment,
        path: currentPath,
        current: i === segments.length - 1,
      });
    });

    return crumbs;
  });
}
