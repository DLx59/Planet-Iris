import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { SupportEntry, TarifData } from '../models/tarif.model';

@Injectable({ providedIn: 'root' })
export class TarifService {
  private http = inject(HttpClient);

  getTarifs() {
    return this.http.get<TarifData>('assets/data.json').pipe(
      map(data =>
        Object.entries(data).map(([support, ratios]): SupportEntry => ({
          support,
          ratios: Object.entries(ratios).map(([name, dimensions]) => ({ name, dimensions }))
        }))
      )
    );
  }
}
