import { ExistingProvider, Type } from '@angular/core';
import { FormFieldControlDirective } from '../directories/form-field-control.directive';

export function createFormFieldControlDirectiveExistingProvider<T>(type: Type<FormFieldControlDirective<T>>): ExistingProvider {
  return { provide: FormFieldControlDirective, useExisting: type };
}
