import {PreloadAllModules, RouterModule, Routes} from "@angular/router";
import {ClothesComponent} from "./clothes/clothes.component";
import {AsideMainComponent} from "./user-profile/aside-main/aside-main.component";
import {CanDeactivateGuard} from "./shared/guard/can-deactivated-guard.service";
import {ParamGuardActivate} from "./shared/guard/param-guard.activate";
import {ClothReviewComponent} from "./cloth-review/cloth-review.component";
import {MainComponent} from "./home/main/main.component";
import {Error404Component} from "./core/error404/error404.component";


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
    path: 'item/review/:id',
    component: ClothReviewComponent
  },
  {
    path: 'profile',
     loadChildren: () => import('./user-profile/user-profile.module').then(user => user.UserProfileModule),
    component: AsideMainComponent,
    canDeactivate: [CanDeactivateGuard],
    canActivate:[ParamGuardActivate],
    data: {
      authenticationRequired: true,
      authenticationFailureUrl: "/"
    }
  }
  ,
  {
    path: '404',
    component: Error404Component
  }
  ,
  {
    path: '**',
    redirectTo: 'home'
  }
];

export const AppRoutingModule = RouterModule.forRoot(routes, {
  preloadingStrategy: PreloadAllModules
});
