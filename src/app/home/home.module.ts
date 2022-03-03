import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MainComponent} from "./main/main.component";
import { NewChargeClothesComponent } from './new-charge-clothes/new-charge-clothes.component';



@NgModule({
  declarations: [
    MainComponent,
    NewChargeClothesComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [

  ]
})
export class HomeModule { }
