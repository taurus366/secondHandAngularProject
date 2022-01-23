import { Component, OnInit } from '@angular/core';
import {UserService} from "../user-service";

@Component({
  selector: 'app-login-register-popup',
  templateUrl: './login-register-popup.component.html',
  styleUrls: ['./login-register-popup.component.css']
})
export class LoginRegisterPopupComponent implements OnInit {
  isLoginOrRegister: boolean = true;
  isForgottenPassword : boolean = false;


  constructor(private userService:UserService) { }

  ngOnInit(): void {
  }

  preventDefault(event: MouseEvent):void {
    event.preventDefault();
  }

  testClick(event: MouseEvent) {
   let win =  document.querySelector(`.popup-window`);
   win === event.target ? this.userService.hideShowLoginRegisterWindow() : this.userService.unhideLoginRegisterWindow();
  }

  showForgottenPasswordWindow(): void {
    this.isForgottenPassword = true;
  }
}
