import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Pack, SpinGameType } from '@ph-hub/common';
import { PackCard } from './pack-card/pack-card';
import { ButtonComponent } from '../../widgets/button/button.component';
import { Dialog } from '@angular/cdk/dialog';
import { CreatePackDialog } from './create-pack-dialog/create-pack-dialog';
import { filter } from 'rxjs';

@Component({
  selector: 'ph-packs',
  imports: [
    PackCard,
    ButtonComponent
  ],
  templateUrl: './packs.html',
  styleUrl: './packs.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Packs {
  dialog = inject(Dialog);

  mockPacks: Pack[] = [
    {
      id: 1,
      title: 'PH charts',
      description: 'Available with premium sub',
      gameType: SpinGameType.regular,
      charts: [],
    },
    {
      id: 2,
      title: 'Nitro',
      description: 'Best charts for 15bb spins',
      gameType: SpinGameType.nitro,
      charts: [],
    },
    {
      id: 3,
      title: 'GTO charts',
      description: 'Everything according to maths. Created with simple poker team',
      gameType: SpinGameType.regular,
      charts: [],
    },
  ];

  openPack(pack: Pack) {
    console.log('open pack', pack);
  }

  openCreatePackDialog() {
    console.log('open create pack dialog');
    const dialogRef = this.dialog.open<Pack>(CreatePackDialog, {
      autoFocus: 'first-heading',
    });

    dialogRef.closed.pipe(
        filter(value => !!value),
    ).subscribe(newPack => {
      console.log(newPack);
    });
  }
}
