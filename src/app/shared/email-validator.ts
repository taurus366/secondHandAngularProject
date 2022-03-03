import {AbstractControl, ValidationErrors} from "@angular/forms";

export function emailValidator(control : AbstractControl) : ValidationErrors | null{
  if (!control.value) {
    return {invalidEmail : true};
  }

  return /^[a-zA-Z0-9_\\.-]{3,}@[a-zA-Z0-9]{2,}\.[a-z]{2,}$/.test(control.value) ? null : { invalidEmail : true};


}

export function isSamePasswords(getTargetControl: () => AbstractControl) {



  return function (control: AbstractControl) {
    const targetControl = getTargetControl();
    return targetControl?.value === control?.value ? null : {invalidSamePasswords : true};
  }
}
