import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ParamGuardActivate} from "./guard/param-guard.activate";
import {AlertMessagesGeneratorDirective} from './alert-messages-generator.directive';
import { EmailValidatorDirective } from './email-validator.directive';
import { PasswordValidatorDirective } from './password-validator.directive';


@NgModule({
  declarations: [
    AlertMessagesGeneratorDirective,
    EmailValidatorDirective,
    PasswordValidatorDirective
  ],
  imports: [
    CommonModule
  ],
  providers: [
    ParamGuardActivate
  ],
    exports: [
        EmailValidatorDirective,
        PasswordValidatorDirective
    ]
})
export class SharedModule {
}
