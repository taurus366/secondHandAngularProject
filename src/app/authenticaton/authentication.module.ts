import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoginRegisterPopupComponent} from "./login-register-popup/login-register-popup.component";
import {RegisterWindowComponent} from "./register-window/register-window.component";
import {LoginWindowComponent} from "./login-window/login-window.component";
import {ForgotPasswordComponent} from "./forgot-password/forgot-password.component";


@NgModule({
  declarations: [
    LoginRegisterPopupComponent,
    RegisterWindowComponent,
    LoginWindowComponent,
    ForgotPasswordComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    LoginRegisterPopupComponent
  ]
})
export class AuthenticationModule {
}
