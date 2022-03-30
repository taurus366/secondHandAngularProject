import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {UserService} from "../user.service";
import {NgForm as NgForm} from '@angular/forms';
import {BooleansService} from "../../shared/booleans.service";
import {SharedService} from "../../shared/shared.service";

const FORM_ERROR_MSG = 'Please correct the information where box in red';

@Component({
  selector: 'app-login-window',
  templateUrl: './login-window.component.html',
  styleUrls: ['./login-window.component.css']
})
export class LoginWindowComponent implements OnInit {

  @Output() isForgottenEventEmitter = new EventEmitter();

  isEmailInCorrect: boolean = false;
  isPasswordInCorrect: boolean = false;


  constructor(private userService: UserService, private booleanService: BooleansService, private sharedService: SharedService) {
  }

  login(form: NgForm): void {


    if (form.invalid) {
      let formControl = form.controls;

      switch (formControl.email.status) {
        case "VALID":
          this.isEmailInCorrect = false;
          break;
        case "INVALID":
          this.isEmailInCorrect = true;
          break
      }

      switch (formControl.password.status) {
        case "VALID":
          this.isPasswordInCorrect = false;
          break;
        case "INVALID":
          this.isPasswordInCorrect = true;
          break;
      }

      this.sharedService
        .showAlertMsg
        .error(FORM_ERROR_MSG);

      return;
    }

    this.userService.login(form.value)
      .subscribe({
        next: value => {
          value.body?.roles.forEach(role => {
            if (role.role === 'ADMINISTRATOR') {
              this.booleanService.setIsAdminTrue();
            }
          });
        },
        error: err => {

          this.booleanService.setIsLoggedFalse();
          this.booleanService.setIsAdminFalse();
          err.status === 401 ? this.sharedService.showAlertMsg.error("Email or Password are not valid!") : 'something goes wrong!';
        },
        complete: () => {
          this.booleanService.setIsLoggedTrue();
          this.booleanService.hideShowLoginRegisterWindow();
          this.sharedService.showAlertMsg.success("Successfully logged!");
          this.userService
            .populateUserCartBoxAndCounter();

        }
      })

  }

  ngOnInit(): void {

  }


  showForgottenPasswordWindow() {
    this.isForgottenEventEmitter.emit();
  }

  preventDefault(event: MouseEvent): void {
    event.preventDefault();
  }

}
