import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import {
  AfterViewInit,
  ChangeDetectorRef,
  Directive,
  DoCheck,
  ElementRef,
  HostListener,
  inject,
  Input,
  OnDestroy,
  Optional,
  Self
} from '@angular/core';
import { NgControl } from '@angular/forms';
import { BehaviorSubject, distinctUntilChanged, map, Observable, ReplaySubject, Subject, takeUntil } from 'rxjs';
import { startWith } from 'rxjs/operators';
import { FormFieldControlState } from '../types/form-field-control-state';

@Directive({
  selector: '[phFormFieldControl]',
  standalone: true,
  host: {
    class: 'ph-form-field__control',
    '[attr.placeholder]': 'placeholderAttribute',
    '[attr.disabled]': 'disabledAttribute',
    '[attr.tabindex]': 'tabIndexAttribute',
  },
})
export class FormFieldControlDirective<T = unknown> implements DoCheck, AfterViewInit, OnDestroy {
  //region Inputs
  @Input()
  get disabled(): boolean {
    return this.state.disabled;
  }

  set disabled(value: BooleanInput) {
    this.setDisabledState(coerceBooleanProperty(value));
  }

  @Input() placeholder?: string;
  @Input() expandable?: boolean;
  //endregion

  //region Attributes
  protected get placeholderAttribute(): string {
    return this.placeholder ?? '';
  }

  protected get disabledAttribute(): '' | undefined {
    return this.state.disabled ? '' : undefined;
  }

  protected get tabIndexAttribute(): number | undefined {
    return this.state.disabled ? undefined : 0;
  }
  //endregion

  /**
   * Set to false to display a pointer cursor.
   */
  readonly isTextual: boolean = true;

  get state(): FormFieldControlState {
    return this._state$.value;
  }

  get state$(): Observable<FormFieldControlState> {
    return this._state$.asObservable();
  }

  protected readonly destroy$ = new Subject<void>();
  protected formFieldElementRef?: ElementRef<HTMLElement>;

  protected get value(): T | undefined {
    return this._value;
  }

  protected set value(value: T | undefined) {
    this._value = value;
    this.value$.next(value);
  }

  protected readonly value$: Subject<T | undefined> = new ReplaySubject(1);
  protected readonly changeDetectorRef: ChangeDetectorRef = inject(ChangeDetectorRef);

  private readonly _state$ =
    new BehaviorSubject<FormFieldControlState>({ active: false, disabled: false, empty: false, invalid: false });

  private _value?: T;

  constructor(
    protected readonly elementRef: ElementRef<HTMLElement>,
    @Optional() @Self() private readonly ngControl?: NgControl,
  ) {
  }

  //region Lifecycle hooks
  ngDoCheck() {
    if (this.ngControl) {
      // Since the input isn't a `ControlValueAccessor`, we don't have a good way of knowing when
      // the disabled state has changed. We can't use the `ngControl.statusChanges`, because it
      // won't fire if the input is disabled with `emitEvents = false`, despite the input becoming
      // disabled.
      this.setDisabledState(!!this.ngControl.disabled);
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  //endregion

  ngAfterViewInit(): void {
    if (this.ngControl) {
      this.ngControl.valueChanges?.pipe(
        startWith(this.ngControl.value),
        takeUntil(this.destroy$),
      ).subscribe(value => {
        this.value$.next(value);
      });

      this.ngControl.statusChanges?.pipe(
        distinctUntilChanged(),
        map(status => status === 'INVALID')
      ).subscribe((invalid) => {
        this.updateState({ invalid });
      });
    }

    const isEmpty$: Observable<boolean> = this.value$
      .pipe(
        startWith(this.ngControl?.value),
        map((value) => !value),
        distinctUntilChanged(),
      );

    isEmpty$
      .pipe(
        takeUntil(this.destroy$),
      )
      .subscribe((isEmpty) => {
        this.updateState({ empty: isEmpty });
      });
  }

  @HostListener('blur')
  protected onHostBlur(): void {
    this.updateState({ active: false });
  }

  @HostListener('focus')
  protected onHostFocus(): void {
    this.updateState({ active: true });
  }

  setFormFieldElement(element: ElementRef<HTMLElement>): void {
    this.formFieldElementRef = element;
  }

  onFormFieldClicked(): void {
    this.elementRef.nativeElement.focus();
  }

  setDisabledState(isDisabled: boolean): void {
    const state = this._state$.value;

    // Check if the control is already disabled
    if (state.disabled === isDisabled) {
      return;
    }

    // If the control is being disabled, make it inactive too.
    const active = isDisabled ? false : state.active;

    this.updateState({ active, disabled: isDisabled });
  }

  private updateState(change: Partial<FormFieldControlState>): void {
    const state = this._state$.value;
    this._state$.next({ ...state, ...change });
    this.changeDetectorRef.detectChanges();
  }
}
