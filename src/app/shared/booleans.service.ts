import { Injectable } from '@angular/core';
import {UserService} from "../user-service";

@Injectable({
  providedIn: 'root'
})
export class BooleansService {

  constructor() { }




  showProfileTextOnHeader : boolean = false;


  setProfileTextName : string = '';

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
