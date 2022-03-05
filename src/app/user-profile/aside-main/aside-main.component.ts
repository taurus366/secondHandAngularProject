import { Component, OnInit } from '@angular/core';
import {BooleansService} from "../../shared/booleans.service";
import {Observable} from "rxjs";
import {UserService} from "../../authentication/user.service";
import {Router} from "@angular/router";
import {SharedService} from "../../shared/shared.service";

@Component({
  selector: 'app-aside-main',
  templateUrl: './aside-main.component.html',
  styleUrls: ['./aside-main.component.css']
})
export class AsideMainComponent implements OnInit {

  // showProfileWindow : boolean = true;
  // showAddressesWindow : boolean = false;
  // showReturnWindow : boolean = false;
  // showPromoCodesWindow : boolean = false;
  // showOrdersWindow : boolean = false;
  // showAdminClothWindow : boolean = false;


  constructor(public booleansService : BooleansService, private userService:UserService, private route:Router, private sharedService:SharedService) { }

  ngOnInit(): void {
    this.booleansService.showProfileTextOnHeader = true;
    this.booleansService.setProfileTextName = 'PROFILE';
  }

  checkIsAdmin(): boolean {
    return this.booleansService.isAdmin;
  }

  logout():void{
    this.userService.logout()
      .subscribe({
        error:err => {
          console.log(err);
        },
        complete:() => {
          this.booleansService.setIsLoggedFalse();
          this.booleansService.setIsAdminFalse();
          this.route.navigate(["/"]);
          this.sharedService.showAlertMsg.success("Successfully logged out !")
        }
      })
  }

  //HERE I RESET THE HEADER TEXT WINDOW!
  canDeactivate(): Observable<boolean> | boolean {
    this.booleansService.showProfileTextOnHeader = false;
    this.booleansService.setProfileTextName = '';
    return true;
  }


  checkProfileWindow():boolean {
    return this.booleansService.showProfileWindow;
  }
  checkAddressesWindow():boolean{
    return this.booleansService.showAddressesWindow;
  }
  checkPromoCodesWindow():boolean {
    return this.booleansService.showPromoCodesWindow;
  }
  checkOrdersWindow():boolean{
    return this.booleansService.showOrdersWindow;
  }
  checkReturnWindow():boolean {
   return this.booleansService.showReturnWindow;
  }
  checkAdminClothWindow():boolean {
    return this.booleansService.showAdminClothWindow;
  }


  visibleProfileWindow() : void {
    this.hideAllWindows();
    this.booleansService.showProfileWindow = true;
    this.booleansService.setProfileTextName = 'PROFILE';
  }

  visibleAddressesWindow() : void {
    this.hideAllWindows();
    this.booleansService.showAddressesWindow = true;
    this.booleansService.setProfileTextName = 'ADDRESSES';
  }

  visibleReturnWindow() : void {
    this.hideAllWindows();
    this.booleansService.showReturnWindow = true;
    this.booleansService.setProfileTextName = 'RETURN';
  }

  visiblePromoCodesWindow() : void {
    this.hideAllWindows();
    this.booleansService.showPromoCodesWindow = true;
    this.booleansService.setProfileTextName = 'MY PROMO CODES';
  }

  visibleOrdersWindow() : void {
    this.hideAllWindows();
    this.booleansService.showOrdersWindow = true;
    this.booleansService.setProfileTextName = 'ORDERS';
  }

  visibleAdminClothWindow() :void {
    this.hideAllWindows();
    this.booleansService.showAdminClothWindow = true;
    this.booleansService.setProfileTextName = 'CREATE NEW CLOTH';
  }

  hideAllWindows() : void {
    this.booleansService.showProfileWindow = false;
    this.booleansService.showAddressesWindow = false;
    this.booleansService.showReturnWindow = false;
    this.booleansService.showOrdersWindow = false;
    this.booleansService.showPromoCodesWindow = false;
    this.booleansService.showAdminClothWindow = false;
    this.booleansService.setProfileTextName = ' ';
  }

}
