import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoadingComponent} from './loading/loading.component';
import {ParamGuardActivate} from "./guard/param-guard.activate";
import {AlertMessagesGeneratorDirective} from './alert-messages-generator.directive';
import { CustomValidatorDirective } from './custom-validator.directive';


@NgModule({
  declarations: [
    LoadingComponent,
    AlertMessagesGeneratorDirective,
    CustomValidatorDirective
  ],
  imports: [
    CommonModule
  ],
  providers: [
    ParamGuardActivate
  ],
    exports: [
        LoadingComponent,
        CustomValidatorDirective
    ]
})
export class SharedModule {
}
