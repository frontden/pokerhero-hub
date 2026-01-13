import { Component, input, output } from '@angular/core';
import { Pack } from '@ph-hub/common';
import { IconsModule } from '../../icons/icons.module';

@Component({
  selector: 'ph-pack-card',
  imports: [
    IconsModule
  ],
  templateUrl: './pack-card.html',
  styleUrl: './pack-card.scss',
  host: {
    'tabindex': '0',
  }
})
export class PackCard {
  pack = input<Pack>();
  selected = output<void>();
}
