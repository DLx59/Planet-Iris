import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/home/home.component').then(m => m.HomeComponent),
  },
  {
    path: 'services',
    loadComponent: () =>
      import('./pages/services/services.component').then(m => m.ServicesComponent),
  },
  {
    path: 'contact',
    loadComponent: () =>
      import('./pages/contact/contact.component').then(m => m.ContactComponent),
  },
  {
    path: 'tarifs',
    loadComponent: () =>
      import('./pages/tarifs/tarifs.component').then(m => m.TarifsComponent),
  },
  {
    path: 'mentions-legales',
    loadComponent: () =>
      import('./pages/mentions-legales/mentions-legales.component').then(m => m.MentionsLegalesComponent),
  },
  {
    path: 'politique-de-confidentialite',
    loadComponent: () =>
      import('./pages/politique-confidentialite/politique-confidentialite.component').then(m => m.PolitiqueConfidentialiteComponent),
  },
  {
    path: '**',
    loadComponent: () =>
      import('./pages/not-found/not-found.component').then(m => m.NotFoundComponent),
  },
];
