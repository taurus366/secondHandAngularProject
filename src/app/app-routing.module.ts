import {RouterModule, Routes} from "@angular/router";
import {MainComponent} from "./main/main.component";
import {ClothesComponent} from "./clothes/clothes.component";
import {AsideMainComponent} from "./user-profile/aside-main/aside-main.component";


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
  {
    path: 'clothes',
    pathMatch: 'full',
    redirectTo: 'clothes/women'
  },
  {
    path: 'profile',
    component: AsideMainComponent
  },
  {
    path: '**',
    redirectTo: 'home'
  }
];

export const AppRoutingModule = RouterModule.forRoot(routes);
