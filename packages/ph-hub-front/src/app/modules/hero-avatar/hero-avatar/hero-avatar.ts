import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'ph-hero-avatar',
  imports: [],
  templateUrl: './hero-avatar.html',
  styleUrl: './hero-avatar.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroAvatar {
    details = input<string[]>([]);
    width = input<number>(400);
    height = input<number>(400);
    borderRadius = input<number>(0);
    background = input<string>('#1A1D21');
    borderColor = input<string>('#363A3D');
}
