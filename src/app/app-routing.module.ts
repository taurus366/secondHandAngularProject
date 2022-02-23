import {RouterModule, Routes} from "@angular/router";
import {MainComponent} from "./main/main.component";
import {ClothesComponent} from "./clothes/clothes.component";
import {AsideMainComponent} from "./user-profile/aside-main/aside-main.component";
import {CanDeactivateGuard} from "./shared/guard/can-deactivated-guard.service";
import {ParamGuardActivate} from "./shared/guard/param-guard.activate";
import {ClothReviewComponent} from "./cloth-review/cloth-review.component";


const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home'
  },
  {
    path: 'home',
    component: MainComponent
  },
  {
    path:'clothes/:who',
    component: ClothesComponent
  },
  //SHOW ALL PRODUCTS
  {
    path: 'clothes',
    pathMatch: 'full',
    redirectTo: 'clothes/women'
  },
  // TO VIEW PRODUCT INFO
  {
    path: 'review/:id',
    component: ClothReviewComponent
  },
  {
    path: 'profile',
    component: AsideMainComponent,
    canDeactivate: [CanDeactivateGuard],
    canActivate:[ParamGuardActivate],
    data: {
      authenticationRequired: true,
      authenticationFailureUrl: "/"
    }
  },
  {
    path: '**',
    redirectTo: 'home'
  }
];

export const AppRoutingModule = RouterModule.forRoot(routes);
