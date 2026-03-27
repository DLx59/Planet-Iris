import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { toSignal } from '@angular/core/rxjs-interop';
import { TranslocoModule } from '@jsverse/transloco';
import { ReviewService } from '../../services/review.service';
import { Review } from '../../models/review.model';

const BOX_COLORS = ['purple', 'red', 'blue'] as const;
const BOX_SPEEDS = ['0.80', '1', '0.85'] as const;

@Component({
  selector: 'app-confiance-section',
  standalone: true,
  imports: [CommonModule, TranslocoModule],
  templateUrl: './confiance-section.component.html',
  styleUrl: './confiance-section.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfianceSectionComponent {
  private reviewService = inject(ReviewService);
  private sanitizer = inject(DomSanitizer);

  private allReviews = toSignal(this.reviewService.getReviews(), { initialValue: [] as Review[] });


  displayedReviews = computed(() => {
    const reviews = [...this.allReviews()];
    // Fisher-Yates shuffle
    for (let i = reviews.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [reviews[i], reviews[j]] = [reviews[j], reviews[i]];
    }
    return reviews.slice(0, 3).map((r, i) => ({
      ...r,
      color: BOX_COLORS[i],
      speed: BOX_SPEEDS[i],
    }));
  });

  hasReviews = computed(() => this.displayedReviews().length > 0);

  getBoxColor(index: number): string {
    return BOX_COLORS[index] ?? 'purple';
  }

  getBoxSpeed(index: number): string {
    return BOX_SPEEDS[index] ?? '1';
  }

  buildStars(rating: number): SafeHtml {
    let html = '';
    for (let i = 1; i <= 5; i++) {
      const diff = rating - (i - 1);
      if (diff >= 1) {
        html += this.starSvg('#FBBC04', '#FBBC04');
      } else if (diff >= 0.25) {
        const uid = Math.random().toString(36).slice(2, 7);
        const gradId = `hstar-${uid}-${i}`;
        const pct = Math.round(diff * 100) + '%';
        html += `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
          <defs>
            <linearGradient id="${gradId}">
              <stop offset="${pct}" stop-color="#FBBC04"/>
              <stop offset="${pct}" stop-color="none"/>
            </linearGradient>
          </defs>
          <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"
            fill="url(#${gradId})" stroke="#FBBC04" stroke-width="1.5" stroke-linejoin="round"/>
        </svg>`;
      } else {
        html += this.starSvg('none', '#ccc');
      }
    }
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }

  googleLogo(): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(
      `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="22" height="22" aria-label="Avis Google" role="img">
        <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
        <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
        <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
        <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.18 1.48-4.97 2.31-8.16 2.31-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
      </svg>`
    );
  }

  getInitial(name: string): string {
    return name.charAt(0).toUpperCase();
  }

  private starSvg(fill: string, stroke: string): string {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
      <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"
        fill="${fill}" stroke="${stroke}" stroke-width="1.5" stroke-linejoin="round"/>
    </svg>`;
  }
}
