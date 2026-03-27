import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="container text-center" style="padding-top: 4rem; padding-bottom: 4rem;">
      <h1>404 - Page introuvable</h1>
      <p>La page que vous recherchez n'existe pas.</p>
      <a routerLink="/" class="button w-button">Retour à l'accueil</a>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotFoundComponent {}
