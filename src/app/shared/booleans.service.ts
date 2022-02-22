import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BooleansService {

  constructor() { }


  isLogged : boolean = false;

  setIsLoggedFalse():void {
    this.isLogged = false;
  }

  setIsLoggedTrue():void {
    this.isLogged = true;
  }

  getIsLogged() {
    return this.isLogged;
  }



  //PROFILE HEADER TEXT OPTIONS
  showProfileWindow : boolean = true;
  showAddressesWindow : boolean = false;
  showReturnWindow : boolean = false;
  showPromoCodesWindow : boolean = false;
  showOrdersWindow : boolean = false;



  showProfileTextOnHeader : boolean = false;
  setProfileTextName : string = '';


  //PROFILE HEADER TEXT OPTIONS



  showLoginRegisterWindow : boolean = false;

  hideShowLoginRegisterWindow() : void {
    this.showLoginRegisterWindow = false;
  };

  unhideLoginRegisterWindow() : void {
    this.showLoginRegisterWindow = true;
  }
  checkStatusOfWindow(): boolean {
    return this.showLoginRegisterWindow;
  }


}
