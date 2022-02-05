import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { LoginRegisterPopupComponent } from './login-register-popup/login-register-popup.component';
import { LoginWindowComponent } from './login-window/login-window.component';
import { RegisterWindowComponent } from './register-window/register-window.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import {UserService} from "./user-service";
import {CoreModule} from "./core/core.module";
import {UserProfileModule} from "./user-profile/user-profile.module";
import { ClothesComponent } from './clothes/clothes.component';
import { ClothReviewComponent } from './cloth-review/cloth-review.component';


@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    LoginRegisterPopupComponent,
    LoginWindowComponent,
    RegisterWindowComponent,
    ForgotPasswordComponent,
    ClothesComponent,
    ClothReviewComponent
  ],
  imports: [
    BrowserModule,
    CoreModule,
    UserProfileModule
  ],
  providers: [
    // UserService,
  //   {
  //   provide:UserService,
  //   useClass:UserService
  // }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
