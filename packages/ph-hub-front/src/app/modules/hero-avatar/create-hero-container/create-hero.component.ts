import { ChangeDetectionStrategy, Component, OnInit, signal } from '@angular/core';
import { ASSETS_PATH, HERO_DETAILS, HeroDetails, HERO_DETAILS_TYPE } from '@shared/constants';
import { randomInt } from '@shared/helpers';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { HeroAvatar } from '../hero-avatar/hero-avatar';

@Component({
    selector: 'ph-create-hero',
    imports: [
        HeroAvatar,
        ReactiveFormsModule
    ],
    templateUrl: './create-hero.component.html',
    styleUrl: './create-hero.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateHero implements OnInit {
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
        this.random();
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
        this.heroLayers.set(Object.values(this.formGroup.value).filter(value => !!value));
    }

    changeDetail(controlName: string, detailPath: string) {
        this.formGroup.get(controlName).setValue(detailPath);
        this.heroLayers.set(Object.values(this.formGroup.value).filter(value => !!value));
    }

    changeActiveType(type: string) {
        this.selectedLayer.set(type);
    }
}
