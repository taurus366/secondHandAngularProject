import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { MainComponent } from './main/main.component';
import { LoginRegisterPopupComponent } from './login-register-popup/login-register-popup.component';
import { LoginWindowComponent } from './login-window/login-window.component';
import { RegisterWindowComponent } from './register-window/register-window.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    MainComponent,
    LoginRegisterPopupComponent,
    LoginWindowComponent,
    RegisterWindowComponent,
    ForgotPasswordComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent,HeaderComponent,FooterComponent]
})
export class AppModule { }
