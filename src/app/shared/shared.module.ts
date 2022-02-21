import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from './loading/loading.component';
import {ParamGuardActivate} from "./guard/param-guard.activate";



@NgModule({
  declarations: [
    LoadingComponent
  ],
  imports: [
    CommonModule
  ],
  providers:[
    ParamGuardActivate
  ],
  exports: [
    LoadingComponent
  ]
})
export class SharedModule { }
