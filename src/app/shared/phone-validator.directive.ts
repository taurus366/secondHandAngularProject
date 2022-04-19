import { Directive } from '@angular/core';
import {AbstractControl, NG_VALIDATORS, ValidationErrors, Validator} from "@angular/forms";

@Directive({
  selector: '[phoneValidator]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: PhoneValidatorDirective,
      multi: true
    }
  ]
})
export class PhoneValidatorDirective implements Validator{

  constructor() { }

  validate(control: AbstractControl): ValidationErrors | null {

    if (!control.value) {
      return {invalidNumber: true}
    }

    return /^(359([0-9]){9}?|[0]?89([0-9]){7}?)$/.test(control.value) ? null : { invalidNumber: true};
  }

}
