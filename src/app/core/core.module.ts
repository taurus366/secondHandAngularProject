import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import {AppRoutingModule} from "../app-routing.modile";
import {AuthenticationModule} from "../authenticaton/authentication.module";
import { CartBoxComponent } from './cart-box/cart-box.component';



@NgModule({
  declarations: [
    FooterComponent,
    HeaderComponent,
    CartBoxComponent
  ],
  imports: [
    CommonModule,
    AuthenticationModule,
    AppRoutingModule
  ],
  exports: [
    FooterComponent,
    HeaderComponent
  ]
})
export class CoreModule { }
