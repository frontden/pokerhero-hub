import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ButtonColor } from './button-color';
import { ButtonResponsiveSize } from './button-responsive-size';
import { ButtonSize } from './button-size';
import { IconsModule } from '../../modules/icons/icons.module';
import { SpinnerIconComponent } from '../../modules/icons/components/spinner/spinner-icon.component';

@Component({
  selector: 'ph-button, [ph-button]',
  imports: [IconsModule, SpinnerIconComponent],
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss', './button-size.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'ph-button',
    '[class.ph-button_disabled]': 'isDisabled',
    '[class.ph-button_type_icon]': 'iconName',

    '[class.ph-button_color_primary]': 'color === ButtonColor.PRIMARY',
    '[class.ph-button_color_secondary]': 'color === ButtonColor.SECONDARY',
    '[class.ph-button_color_tertiary]': 'color === ButtonColor.TERTIARY',
    '[class.ph-button_color_ghost]': 'color === ButtonColor.GHOST',
    '[class.ph-button_color_glass]': 'color === ButtonColor.GLASS',
    '[class.ph-button_color_unstyled]': 'color === ButtonColor.UNSTYLED',

    '[class.ph-button_size_l]': 'size === ButtonSize.L',
    '[class.ph-button_size_m]': 'size === ButtonSize.M',
    '[class.ph-button_size_s]': 'size === ButtonSize.S',
    '[class.ph-button_size_mml]': 'size === ButtonResponsiveSize.MML',
    '[class.ph-button_size_mll]': 'size === ButtonResponsiveSize.MLL',
    '[class.ph-button_size_smm]': 'size === ButtonResponsiveSize.SMM',
    '[class.ph-button_size_sml]': 'size === ButtonResponsiveSize.SML',

    '[attr.disabled]': 'isDisabled ? "" : undefined'
  },
})
export class ButtonComponent {
  @Input() color: ButtonColor | string = ButtonColor.PRIMARY;
  @Input() iconName?: string;
  @Input() leftIconName?: string;
  @Input() rightIconName?: string;
  @Input() size: ButtonSize | ButtonResponsiveSize | string = ButtonSize.L;
  @Input() isLoading: boolean = false;
  protected isDisabled = false;
  protected readonly ButtonColor = ButtonColor;
  protected readonly ButtonSize = ButtonSize;
  protected readonly ButtonResponsiveSize = ButtonResponsiveSize;

  @Input()
  set disabled(value: BooleanInput) {
    this.isDisabled = coerceBooleanProperty(value);
  }
}
