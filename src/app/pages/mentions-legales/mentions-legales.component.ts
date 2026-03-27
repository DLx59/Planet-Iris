import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-mentions-legales',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './mentions-legales.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MentionsLegalesComponent {}
