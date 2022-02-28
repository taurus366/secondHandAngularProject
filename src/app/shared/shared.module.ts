import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoadingComponent} from './loading/loading.component';
import {ParamGuardActivate} from "./guard/param-guard.activate";
import {AlertMessagesGeneratorDirective} from './alert-messages-generator.directive';


@NgModule({
  declarations: [
    LoadingComponent,
    AlertMessagesGeneratorDirective
  ],
  imports: [
    CommonModule
  ],
  providers: [
    ParamGuardActivate
  ],
  exports: [
    LoadingComponent
  ]
})
export class SharedModule {
}
