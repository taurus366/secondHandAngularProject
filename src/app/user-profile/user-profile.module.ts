import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile/profile.component';
import { AsideMainComponent } from './aside-main/aside-main.component';
import { AddressesComponent } from './addresses/addresses.component';
import { ReturnComponent } from './return/return.component';
import { OrdersComponent } from './orders/orders.component';
import { PromoCodesComponent } from './promo-codes/promo-codes.component';
import {RouterModule} from "@angular/router";
import {CanDeactivateGuard} from "../shared/guard/can-deactivated-guard.service";
import { AdminClothComponent } from './admin-cloth/admin-cloth.component';



@NgModule({
  declarations: [
    ProfileComponent,
    AsideMainComponent,
    AddressesComponent,
    ReturnComponent,
    OrdersComponent,
    PromoCodesComponent,
    AdminClothComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    AsideMainComponent
  ],
  providers: [
    CanDeactivateGuard
  ]
})
export class UserProfileModule { }
