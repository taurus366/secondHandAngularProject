import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from "@angular/router";
import {BooleansService} from "../booleans.service";
import {Observable} from "rxjs";

@Injectable()
export class IsCartNotNullGuardActivate implements CanActivate {

  constructor(private router:Router , private booleanService:BooleansService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

   const {authenticationRequired, authFailUrl, isCartItemRequired} = route.data;

   if (typeof authenticationRequired === 'boolean' && typeof isCartItemRequired === 'boolean' && authenticationRequired && this.booleanService.getIsLogged() && isCartItemRequired && this.booleanService.cartBoxItems != null) {
     return true;
   }
    return this.router.parseUrl(authFailUrl || '/');
  }
}
