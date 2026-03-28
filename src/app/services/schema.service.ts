import { inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class SchemaService {
  private document = inject(DOCUMENT);

  inject(schema: object, id?: string): void {
    const script = this.document.createElement('script');
    if (id) script.id = id;
    script.type = 'application/ld+json';
    script.text = JSON.stringify(schema);
    this.document.head.appendChild(script);
  }

  update(id: string, schema: object): void {
    const existing = this.document.getElementById(id) as HTMLScriptElement | null;
    if (existing) {
      existing.text = JSON.stringify(schema);
    } else {
      this.inject(schema, id);
    }
  }
}
