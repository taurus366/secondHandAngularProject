import { Component, OnInit } from '@angular/core';
import {BooleansService} from "../../shared/booleans.service";
import {SharedService} from "../../shared/shared.service";

@Component({
  selector: 'app-login-register-popup',
  templateUrl: './login-register-popup.component.html',
  styleUrls: ['./login-register-popup.component.css']
})
export class LoginRegisterPopupComponent implements OnInit {
  isLoginOrRegister: boolean = true;
  isForgottenPassword : boolean = false;


  constructor(private userService:BooleansService,public publicMethods:SharedService) { }

  ngOnInit(): void {
  }


  clickEv(event: MouseEvent) {

   let win =  document.querySelector(`.popup-window`);

    // console.log(event.target === win)
   win === event.target ? this.userService.hideShowLoginRegisterWindow() : this.userService.unhideLoginRegisterWindow();
  }

  showForgottenPasswordWindow(): void {
    this.isForgottenPassword = true;
  }
}
