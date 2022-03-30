import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import {AppRoutingModule} from "../app-routing.module";
import {AuthenticationModule} from "../authentication/authentication.module";
import { CartBoxComponent } from './cart-box/cart-box.component';
import {SharedModule} from "../shared/shared.module";
import {AlertMessagesComponent} from "./alert-messages/alert-messages.component";
import { LoadingComponent } from './loading/loading.component';
import { Error404Component } from './error404/error404.component';
import { LikeBoxComponent } from './like-box/like-box.component';



@NgModule({
  declarations: [
    FooterComponent,
    HeaderComponent,
    CartBoxComponent,
    AlertMessagesComponent,
    LoadingComponent,
    Error404Component,
    LikeBoxComponent
  ],
  imports: [
    CommonModule,
    AuthenticationModule,
    AppRoutingModule,
    SharedModule
  ],
  exports: [
    FooterComponent,
    HeaderComponent
  ]
})
export class CoreModule { }
