import {RouterModule, Routes} from "@angular/router";
import {MainComponent} from "./main/main.component";
import {ClothesComponent} from "./clothes/clothes.component";


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
    path: 'shop',
    component: ClothesComponent
  }
  ];

export const AppRoutingModule = RouterModule.forRoot(routes);
