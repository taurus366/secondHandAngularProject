import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from "@angular/router";
import {Observable} from "rxjs";
import {BooleansService} from "../booleans.service";
import {Injectable} from "@angular/core";

@Injectable()
export class ParamGuardActivate implements CanActivate {

  constructor(private router:Router , private booleanService:BooleansService) {
  }


  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    const {authenticationRequired , authenticationFailureRedirectUrl } = route.data;

    if (typeof authenticationRequired === 'boolean' && authenticationRequired && this.booleanService.getIsLogged()) {
      return true;
    } else {
      return this.router.parseUrl(authenticationFailureRedirectUrl || '/');
    }

  }

}
