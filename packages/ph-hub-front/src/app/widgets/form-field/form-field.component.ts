import { CommonModule } from '@angular/common';
import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  ElementRef,
  Input,
  OnDestroy
} from '@angular/core';
import { Observable, pluck, Subject } from 'rxjs';
import { FormFieldControlDirective } from './directories/form-field-control.directive';
import { FormFieldResponsiveSize } from './form-field-responsive-size';
import { FormFieldSize } from './form-field-size';
import { IconsModule } from '../../modules/icons/icons.module';

@Component({
  selector: 'ph-form-field',
  imports: [CommonModule, IconsModule],
  templateUrl: './form-field.component.html',
  styleUrls: ['./form-field.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'ph-form-field',
  }
})
export class FormFieldComponent implements AfterContentInit, OnDestroy {
  @Input() label?: string;
  @Input() iconName?: string;
  @Input() size: FormFieldSize | FormFieldResponsiveSize | string = FormFieldSize.L;

  protected active$?: Observable<boolean>;
  protected isDisabled$?: Observable<boolean>;
  protected invalid$?: Observable<boolean>;
  protected readonly FormFieldSize = FormFieldSize;
  protected readonly FormFieldResponsiveSize = FormFieldResponsiveSize;
  @ContentChild(FormFieldControlDirective) private readonly control?: FormFieldControlDirective;
  private readonly destroy$ = new Subject<void>();

  constructor(private readonly elementRef: ElementRef<HTMLElement>) {
  }

  protected get expandable(): boolean {
    return !!(this.control && this.control.expandable);
  }

  protected get isTextual(): boolean {
    return !!this.control?.isTextual;
  }

  //region Lifecycle hooks
  ngAfterContentInit(): void {
    if (this.control) {
      this.control.setFormFieldElement(this.elementRef);

      this.active$ = this.control.state$.pipe(pluck('active'));
      this.isDisabled$ = this.control.state$.pipe(pluck('disabled'));
      this.invalid$ = this.control.state$.pipe(pluck('invalid'));
    }
  }

  //endregion

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  protected onAreaClick(): void {
    this.control?.onFormFieldClicked();
  }
}
