import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { TranslocoModule } from '@jsverse/transloco';

interface FaqItem {
  questionKey: string;
  answerKey: string;
}

@Component({
  selector: 'app-faq-section',
  standalone: true,
  imports: [TranslocoModule],
  templateUrl: './faq-section.component.html',
  styleUrl: './faq-section.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FaqSectionComponent {
  openIndex = signal<number | null>(null);

  toggle(index: number): void {
    this.openIndex.update(current => current === index ? null : index);
  }

  faqItems: FaqItem[] = [
    { questionKey: 'faq.q1', answerKey: 'faq.a1' },
    { questionKey: 'faq.q2', answerKey: 'faq.a2' },
    { questionKey: 'faq.q3', answerKey: 'faq.a3' },
    { questionKey: 'faq.q4', answerKey: 'faq.a4' },
    { questionKey: 'faq.q5', answerKey: 'faq.a5' },
    { questionKey: 'faq.q6', answerKey: 'faq.a6' },
    { questionKey: 'faq.q7', answerKey: 'faq.a7' },
    { questionKey: 'faq.q8', answerKey: 'faq.a8' },
    { questionKey: 'faq.q9', answerKey: 'faq.a9' },
    { questionKey: 'faq.q10', answerKey: 'faq.a10' },
  ];
}
