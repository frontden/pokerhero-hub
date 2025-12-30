import { ChangeDetectionStrategy, Component, input, OnInit, output, signal } from '@angular/core';
import { ASSETS_PATH, HERO_DETAILS, HeroDetails, HERO_DETAILS_TYPE } from '@shared/constants';
import { randomInt } from '@shared/helpers';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { HeroAvatar } from '../hero-avatar/hero-avatar';
import { ButtonComponent } from '../../../widgets/button/button.component';

@Component({
  selector: 'ph-create-hero',
  imports: [
    HeroAvatar,
    ReactiveFormsModule,
    ButtonComponent
  ],
  templateUrl: './create-hero.component.html',
  styleUrl: './create-hero.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateHero implements OnInit {

  initialAvatar = input<string[]>([]);
  avatarChange = output<string[]>();

  heroLayers = signal<string[]>([]);
  selectedLayer = signal<string>('body')
  heroDetails: HeroDetails[] = HERO_DETAILS;
  detailType = HERO_DETAILS_TYPE;
  assetsPath = ASSETS_PATH;
  formGroup = new FormGroup({
    body: new FormControl(),
    hat: new FormControl(),
    earrings: new FormControl(),
    mouth: new FormControl(),
    glasses: new FormControl(),
  });

  public ngOnInit() {
    const initial = this.initialAvatar();

    if (initial && initial.length > 0) {
      this.loadAvatar(initial);
    } else {
      this.random();
    }
  }

  public random(): void {
    this.heroDetails.forEach(heroDetail => {
      const isSkipped = heroDetail.skipChance > 0 && randomInt(0, 100) < heroDetail.skipChance;
      let detailsPath = '';
      if (!isSkipped) {
        const randomIndex = randomInt(0, heroDetail.details.length - 1);
        detailsPath = `${ASSETS_PATH}${heroDetail.path}${heroDetail.details[randomIndex]}`;
      }
      this.formGroup.get(heroDetail.name).setValue(detailsPath);
    });

    this.updateLayers();
  }

  changeDetail(controlName: string, detailPath: string) {
    this.formGroup.get(controlName).setValue(detailPath);
    this.updateLayers();
  }

  changeActiveType(type: string) {
    this.selectedLayer.set(type);
  }

  private updateLayers(): void {
    const layers = Object.values(this.formGroup.value).filter(value => !!value) as string[];
    this.heroLayers.set(layers);

    this.avatarChange.emit(layers);
  }

  private loadAvatar(avatar: string[]): void {
    avatar.forEach(part => {
      const detail = this.heroDetails.find(hd => part.includes(hd.path));
      if (detail) {
        this.formGroup.get(detail.name)?.setValue(part);
      }
    });

    this.updateLayers();
  }
}
