import {Component, OnInit} from '@angular/core';
import {ApiConnectionServiceService} from '../../shared/api-connection-service.service';
import {NgForm} from "@angular/forms";
import {stringify} from "@angular/compiler/src/util";
import {UserService} from "../user.service";
import {BooleansService} from "../../shared/booleans.service";
import {SharedService} from "../../shared/shared.service";
import {emailValidator} from "../../shared/email-validator";

const FORM_ERROR_MSG = 'Please correct the information where box in red';

@Component({
  selector: 'app-register-window',
  templateUrl: './register-window.component.html',
  styleUrls: ['./register-window.component.css']
})
export class RegisterWindowComponent implements OnInit {

  constructor(public userService: UserService, private booleanService: BooleansService, private sharedService: SharedService) {

  }

  isFirstNameIncorrect = false;
  isLastNameIncorrect = false;
  isEmailIncorrect = false;
  isPasswordIncorrect = false;
  isConfirmPasswordIncorrect = false;
  isGenderIncorrect = false;



  emailValidator = emailValidator;

  ngOnInit(): void {
  }

  register(form: NgForm) {
      console.log(form)



    if (form.invalid) {
console.log("error FORM")
      let formControl = form.controls;

      switch (formControl.firstName.status) {
        case 'INVALID':
          this.isFirstNameIncorrect = true;
          break;
        case "VALID":
          this.isFirstNameIncorrect = false;
          break
      }

      switch (formControl.lastName.status) {
        case 'INVALID':
          this.isLastNameIncorrect = true;
          break;
        case "VALID":
          this.isLastNameIncorrect = false;
          break
      }

      switch (formControl.email.status) {
        case 'INVALID':
          this.isEmailIncorrect = true
          break;
        case "VALID":
          this.isEmailIncorrect = false;
          break
      }

      switch (formControl.password.status) {
        case 'INVALID':
          this.isPasswordIncorrect = true;
          break;
        case 'VALID':
          this.isPasswordIncorrect = false;
          break;
      }

      switch (formControl.confirmPassword.status) {
        case 'INVALID':
          this.isConfirmPasswordIncorrect = true;
          break;
        case 'VALID':
          this.isConfirmPasswordIncorrect = false;
          break;
      }

      switch (formControl.sex.status) {
        case 'INVALID':
          this.isGenderIncorrect = true;
          break;
        case "VALID":
          this.isGenderIncorrect = false;
          break
      }

      this.sharedService
        .showAlertMsg
        .error(FORM_ERROR_MSG);

      return;
    }

    this.restartAllFields();


    this.userService.register(form.value)
      .subscribe({
        next: value => {
          value.body?.roles.forEach(role => {
            if (role.role === 'ADMINISTRATOR') {
              this.booleanService.setIsAdminTrue();
            }
          });
        },
        error: err => {
          console.log(err.error);
          let message = '';
          Array.from(err.error)
            .forEach(value => {
              // @ts-ignore
              let defaultMessage = value.defaultMessage.toString();
              // @ts-ignore
              let field = value.field.toString().toLowerCase() === 'lastname' ? 'last name' :
                // @ts-ignore
                value.field.toString().toLowerCase() === 'confirmpassword' ? 'confirm password' :
                  // @ts-ignore
                  value.field.toString().toLowerCase() === 'firstname' ? 'first name' : value.field.toString().toLowerCase();

              message += message.length === 39 ? message += `${field + ' : ' + defaultMessage}|` : `${field + ' : ' + defaultMessage}|`;


            });

          this.sharedService.showAlertMsg.error(`${message.slice(0, message.length - 1)}`);
        },
        complete: () => {
          this.booleanService.setIsLoggedTrue()
          this.booleanService.hideShowLoginRegisterWindow();
          this.sharedService.showAlertMsg.success("Successfully registered! Logged automatically!")
        }
      })

  }

  restartAllFields = () => {
    this.isFirstNameIncorrect = false;
    this.isLastNameIncorrect = false;
    this.isEmailIncorrect = false;
    this.isConfirmPasswordIncorrect = false;
    this.isPasswordIncorrect = false;
    this.isGenderIncorrect = false;
  };
}
