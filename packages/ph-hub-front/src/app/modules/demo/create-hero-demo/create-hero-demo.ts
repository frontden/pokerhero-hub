import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CreateHero } from '../../hero-avatar/create-hero/create-hero.component';

@Component({
  selector: 'ph-create-hero-demo',
  imports: [CreateHero],
  templateUrl: './create-hero-demo.html',
  styleUrl: './create-hero-demo.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateHeroDemo {}
