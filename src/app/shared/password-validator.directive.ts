import {Directive, Input} from '@angular/core';
import {AbstractControl, NG_VALIDATORS, NgForm, ValidationErrors, Validator} from "@angular/forms";
import {Subscription} from "rxjs";

@Directive({
  selector: '[appPasswordValidator]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: PasswordValidatorDirective,
      multi: true
    }
  ]
})


export class PasswordValidatorDirective implements Validator {

  @Input() appPasswordValidator = "";

  subscription! : Subscription;

  constructor(private form: NgForm) {
  }


  validate(control: AbstractControl): ValidationErrors | null {

    const firstPassword = this.form.controls[this.appPasswordValidator];
    const confirmPassword = control.value;

    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    this.subscription = firstPassword.valueChanges.subscribe( () => {
      control.updateValueAndValidity( { onlySelf: false} )
    });

    return firstPassword.value !== confirmPassword ? {isSamePasswords: true} : null

  }

}

//
// export class PasswordValidator implements Validator {
//
//   @Input() firstPasswordField = "";
//   @Input() confirmPasswordField! : string;
//
//   constructor(private form:NgForm) {
//   }
//
//   validate(control: AbstractControl): ValidationErrors | null {
//
//     const firstPasswordValue = this.form.controls[this.firstPasswordField].value;
//     const confirmPasswordValue = control.value;
//
//     return firstPasswordValue !== confirmPasswordValue ? {
//       passwordDontMatch: {
//         [firstPasswordValue]: firstPasswordValue,
//         [this.confirmPasswordField]: confirmPasswordValue
//       }
//     } : null
//
//   }
// }
