import { Routes } from '@angular/router';

export const BLOG_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/blog/blog.component').then(m => m.BlogComponent),
  },
  {
    path: 'iris-yeux-marrons',
    loadComponent: () =>
      import('./pages/blog/iris-yeux-marrons/iris-yeux-marrons.component').then(m => m.IrisYeuxMarronsComponent),
  },
  {
    path: 'photo-iris-cataracte',
    loadComponent: () =>
      import('./pages/blog/photo-iris-cataracte/photo-iris-cataracte.component').then(m => m.PhotoIrisCataracteComponent),
  },
];
