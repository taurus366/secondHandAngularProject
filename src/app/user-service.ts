import { Injectable } from '@angular/core';
// FOR TEST
import {environment} from '../environments/environment';
const API_URL = environment.apiURL;


@Injectable({
  providedIn: 'root'
})
export class UserService {

showLoginRegisterWindow : boolean = false;
showProfileTextOnHeader : boolean = false;

  constructor() { }

  setProfileTextName : string = '';

  hideShowLoginRegisterWindow() : void {
    this.showLoginRegisterWindow = false;
  };

  unhideLoginRegisterWindow() : void {
    this.showLoginRegisterWindow = true;
  }
}
