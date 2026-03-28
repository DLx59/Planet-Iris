import { Injectable } from '@angular/core';
import { SupportEntry, TarifData } from '../models/tarif.model';
import rawData from '../../../data.json';

@Injectable({ providedIn: 'root' })
export class TarifService {
  getTarifs(): SupportEntry[] {
    return Object.entries(rawData as TarifData).map(([support, ratios]): SupportEntry => ({
      support,
      ratios: Object.entries(ratios).map(([name, dimensions]) => ({ name, dimensions }))
    }));
  }
}
