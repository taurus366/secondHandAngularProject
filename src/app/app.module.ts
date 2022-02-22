import {NgModule, PLATFORM_ID} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { LoginRegisterPopupComponent } from './authentication/login-register-popup/login-register-popup.component';
import { LoginWindowComponent } from './authentication/login-window/login-window.component';
import { RegisterWindowComponent } from './authentication/register-window/register-window.component';
import { ForgotPasswordComponent } from './authentication/forgot-password/forgot-password.component';
import {CoreModule} from "./core/core.module";
import {UserProfileModule,} from "./user-profile/user-profile.module";
import { ClothesComponent } from './clothes/clothes.component';
import { ClothReviewComponent } from './cloth-review/cloth-review.component';
import {AppRoutingModule} from "./app-routing.module";
import {SharedModule} from "./shared/shared.module";
import {LocalStorage} from "./shared/injection-tokens";
import {isPlatformBrowser, isPlatformServer} from "@angular/common";


@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    ClothesComponent,
    ClothReviewComponent
  ],
  imports: [
    BrowserModule,
    CoreModule,
    UserProfileModule,
    AppRoutingModule,
    SharedModule
  ],
  providers: [{
    provide: LocalStorage,
    useFactory: (platformId: Object) => {
      if (isPlatformBrowser(platformId)) {
        return window.localStorage;
      }
      if (isPlatformServer(platformId)) {
        return class implements Storage {
          length = 0;
          private data = {};

          clear(): void {
            this.data = {};
          }

          getItem(key: string): string | null {
            // @ts-ignore
            return this.data[key];
          }

          key(index: number): string | null {
            // @ts-ignore
            return undefined;
          }

          removeItem(key: string): void {
            // @ts-ignore
            const {[key]: removedItem, ...others} = this.data;
            this.data = others;
          }

          setItem(key: string, value: string): void {
            // @ts-ignore
            this.data[key] = value;
          }

        }
      }
      throw Error('NOT IMPLEMENTED');

    },
    deps: [PLATFORM_ID]
    // UserService,
    //   {
    //   provide:UserService,
    //   useClass:UserService
    // }
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
