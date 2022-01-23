import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

showLoginRegisterWindow : boolean = false;

  constructor() { }

  hideShowLoginRegisterWindow() : void {
    this.showLoginRegisterWindow = false;
  };

  unhideLoginRegisterWindow() : void {
    this.showLoginRegisterWindow = true;
  }
}
