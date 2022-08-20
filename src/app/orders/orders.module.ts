import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderBagComponent } from './order-bag/order-bag.component';
import { OrderAddressPaymentComponent } from './order-address-payment/order-address-payment.component';
import { OrderMainComponent } from './order-main/order-main.component';
import { OrderFinishComponent } from './order-finish/order-finish.component';
import { OrderNavComponent } from './order-nav/order-nav.component';



@NgModule({
  declarations: [
    OrderBagComponent,
    OrderAddressPaymentComponent,
    OrderMainComponent,
    OrderFinishComponent,
    OrderNavComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    OrderMainComponent
  ]
})
export class OrdersModule { }
