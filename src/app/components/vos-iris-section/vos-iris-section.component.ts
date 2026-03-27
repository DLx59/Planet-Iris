import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TranslocoModule } from '@jsverse/transloco';

interface IrisItem {
  number: string;
  labelKey: string;
  name: string;
  altKey: string;
}

@Component({
  selector: 'app-vos-iris-section',
  standalone: true,
  imports: [TranslocoModule],
  templateUrl: './vos-iris-section.component.html',
  styleUrl: './vos-iris-section.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VosIrisSectionComponent {
  irisItems: IrisItem[] = [
    { number: '1iris', labelKey: 'vos-iris.items.1.label', name: 'uno',      altKey: 'vos-iris.items.1.alt' },
    { number: '2iris', labelKey: 'vos-iris.items.2.label', name: 'duo',      altKey: 'vos-iris.items.2.alt' },
    { number: '3iris', labelKey: 'vos-iris.items.3.label', name: 'trio',     altKey: 'vos-iris.items.3.alt' },
    { number: '4iris', labelKey: 'vos-iris.items.4.label', name: 'quatuor',  altKey: 'vos-iris.items.4.alt' },
    { number: '5iris', labelKey: 'vos-iris.items.5.label', name: 'quintuor', altKey: 'vos-iris.items.5.alt' },
    { number: '6iris', labelKey: 'vos-iris.items.6.label', name: 'sextuor',  altKey: 'vos-iris.items.6.alt' },
  ];

  getSrcset(name: string): string {
    const widths = [200, 359, 475, 580, 665, 733, 784, 853, 920, 978, 1033, 1091, 1144, 1199, 1254, 1309, 1359, 1394, 1400];
    return widths.map(w => `img/vos-iris/${name}_w_${w}.webp ${w}w`).join(',\n');
  }
}
