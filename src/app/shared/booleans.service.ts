import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BooleansService {

  constructor() { }

  //ADMIN OR USER LOGIN
  isLogged : boolean = false;
  isAdmin : boolean = false;
  setIsAdminFalse():void {
    this.isAdmin = false;
  }
  setIsAdminTrue():void {
    this.isAdmin = true;
  }
  getIsAdmin():boolean {
    return this.isAdmin;
  }

  setIsLoggedFalse():void {
    this.isLogged = false;
  }

  setIsLoggedTrue():void {
    this.isLogged = true;
  }

  getIsLogged() {
    return this.isLogged;
  }
  //ADMIN OR USER LOGIN


  //PROFILE HEADER TEXT OPTIONS
  showProfileWindow : boolean = true;
  showAddressesWindow : boolean = false;
  showReturnWindow : boolean = false;
  showPromoCodesWindow : boolean = false;
  showOrdersWindow : boolean = false;
  showAdminClothWindow : boolean = false;



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

//  SHOW LOADING PAGE
 private showOrHideLoadingPage : boolean = false;

  showLoadingPage() :void{
    this.showOrHideLoadingPage = true;
  }
  hideLoadingPage() :void{
    this.showOrHideLoadingPage = false;
  }
  checkLoadingPage() : boolean {
    return this.showOrHideLoadingPage;
  }
//  SHOW LOADING PAGE



}
