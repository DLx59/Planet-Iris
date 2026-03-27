import { ChangeDetectionStrategy, Component } from '@angular/core';

interface IrisItem {
  number: string;
  label: string;
  name: string;
  alt: string;
}

@Component({
  selector: 'app-vos-iris-section',
  standalone: true,
  templateUrl: './vos-iris-section.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VosIrisSectionComponent {
  irisItems: IrisItem[] = [
    { number: '1iris', label: "Être seul, c'est parfois mieux que mal accompagné, et franchement, votre iris se suffit à lui-même.", name: 'uno', alt: "Photo d'un iris seul par Planet'Iris" },
    { number: '2iris', label: "Votre moitié a aussi un iris magnifique ? C'est le moment de vérifier, et d'immortaliser ça.", name: 'duo', alt: "Photo de deux iris par Planet'Iris" },
    { number: '3iris', label: "Deux, c'était bien. Trois, c'est mieux. Surtout quand on peut les accrocher au mur.", name: 'trio', alt: "Photo de trois iris par Planet'Iris" },
    { number: '4iris', label: "Parce que la ressemblance familiale, ça se lit aussi dans les yeux. Spoiler : c'est souvent frappant.", name: 'quatuor', alt: "Photo de quatre iris par Planet'Iris" },
    { number: '5iris', label: "À ce stade, c'est carrément une galerie d'art. Manque juste l'étiquette avec le prix.", name: 'quintuor', alt: "Photo de cinq iris par Planet'Iris" },
    { number: '6iris', label: "Six iris, c'est la famille au complet. Les grands-parents compris, et ils méritent leur place sur le mur.", name: 'sextuor', alt: "Photo de six iris par Planet'Iris" },
  ];

  getSrcset(name: string): string {
    const widths = [200, 359, 475, 580, 665, 733, 784, 853, 920, 978, 1033, 1091, 1144, 1199, 1254, 1309, 1359, 1394, 1400];
    return widths.map(w => `img/vos-iris/${name}_w_${w}.webp ${w}w`).join(',\n');
  }
}
