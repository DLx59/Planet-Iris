import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, of } from 'rxjs';
import { Review } from '../models/review.model';

@Injectable({ providedIn: 'root' })
export class ReviewService {
  private http = inject(HttpClient);

  getReviews(lang: string) {
    return this.http.get<Review[]>(`/reviews.php?lang=${lang}`).pipe(
      catchError(() => of([] as Review[]))
    );
  }
}
