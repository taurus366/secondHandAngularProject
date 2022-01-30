import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile/profile.component';
import { AsideMainComponent } from './aside-main/aside-main.component';
import { AddressesComponent } from './addresses/addresses.component';
import { ReturnComponent } from './return/return.component';



@NgModule({
  declarations: [
    ProfileComponent,
    AsideMainComponent,
    AddressesComponent,
    ReturnComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    AsideMainComponent
  ]
})
export class UserProfileModule { }
