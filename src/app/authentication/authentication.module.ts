import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoginRegisterPopupComponent} from "./login-register-popup/login-register-popup.component";
import {RegisterWindowComponent} from "./register-window/register-window.component";
import {LoginWindowComponent} from "./login-window/login-window.component";
import {ForgotPasswordComponent} from "./forgot-password/forgot-password.component";
import {ApiConnectionServiceService} from "../shared/api-connection-service.service";
import {SharedModule} from "../shared/shared.module";
import {HttpClientModule, HttpClientXsrfModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    LoginRegisterPopupComponent,
    RegisterWindowComponent,
    LoginWindowComponent,
    ForgotPasswordComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    HttpClientModule,
    HttpClientXsrfModule.withOptions({
      cookieName:'JSESSIONID',
      headerName:'XSRF-TOKEN'
    }),
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    LoginRegisterPopupComponent
  ],
  providers: [

  ]
})
export class AuthenticationModule {
}
