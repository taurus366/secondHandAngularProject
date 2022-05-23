import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {BooleansService} from "../../shared/booleans.service";
import {IUSER} from "../../shared/interfaces/IUSER";
import {NgForm} from "@angular/forms";
import {SharedService} from "../../shared/shared.service";
import {UserService} from "../../authentication/user.service";

let FORM_ERROR_MSG: string = "";
let FORM_PASSWORDS_ARE_NOT_MATCH_MSG: string = "";
let FORM_SUCCESSFUL_CHANGED_PASSWORD: string = "";
let FORM_SUCCESSFUL_CHANGED_PERSONAL_DATA: string = "";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit,OnChanges {

  constructor(public booleanService: BooleansService, private sharedService: SharedService, private userService: UserService) {
  }

  // CHANGE PASSWORD FORM
  isCurrentPasswordIncorrect: boolean = false;
  isNewPasswordIncorrect: boolean = false;
  isNewPasswordAndConfirmPasswordSame: boolean = false;
  isConfirmPasswordIncorrect: boolean = false;
  isCurrentPasswordDifferentThanNewPassword: boolean = false;
  // CHANGE PASSWORD FORM END

  // CHANGE PERSONAL DATA
  isNameIncorrect: boolean = false;
  isLastNameIncorrect: boolean = false;
  isPhoneNumberIncorrect: boolean = false;
  // CHANGE PERSONAL DATA END

  user: IUSER | undefined;

  ngOnInit(): void {
    this.updateUserInfo();
    FORM_ERROR_MSG = this.sharedService.formMessages.FORM.FORM_ERROR_MSG;
    FORM_PASSWORDS_ARE_NOT_MATCH_MSG = this.sharedService.formMessages.FORM.FORM_PASSWORDS_ARE_NOT_MATCH_MSG;
    FORM_SUCCESSFUL_CHANGED_PASSWORD = this.sharedService.formMessages.FORM.FORM_SUCCESSFUL_CHANGED_PASSWORD;
    FORM_SUCCESSFUL_CHANGED_PERSONAL_DATA = this.sharedService.formMessages.FORM.FORM_SUCCESSFUL_CHANGED_PERSONAL_DATA;
  }

  updateUserInfo(): void {
    this.user = this.booleanService.user
  }

  ngOnChanges(changes:SimpleChanges): void {
    console.log("onchange works!")
    let b = changes.this.isFirstChange();
    this.updateUserInfo();
  }

  changePersonalData(form: NgForm) {

    let formControl = form.controls;

    if (formControl.firstName.value != null && formControl.firstName.value.length > 0){
      this.isNameIncorrect = formControl.firstName.value.length < 3 || formControl.firstName.value.length > 12;
    }

    if (formControl.lastName.value != null && formControl.lastName.value.length > 0){
      this.isLastNameIncorrect = formControl.lastName.value.length < 3 || formControl.lastName.value.length > 12;
    }

    this.isPhoneNumberIncorrect = formControl.phoneNumber.errors?.invalidNumber;

    let lastNumber: string = '';
    // if (formControl.phoneNumber.value != null && formControl.phoneNumber.value !== "" && formControl.phoneNumber.value.length > 0){
    //  let regex = new RegExp('^(0?|359?)[0-9]{9}$');
    //   this.isPhoneNumberIncorrect = !regex.test(formControl.phoneNumber.value);
    //   if (!this.isPhoneNumberIncorrect){
    //     lastNumber = formControl.phoneNumber.value;
    // }
    //   console.log(lastNumber)
    //   // 0 IS DOESN'T READ, SO I CHECK HERE AND IF IT IS 9 NUMBER I ADD 0 IN START!
    //   // if (lastNumber.length === 9){
    //   // lastNumber = "0"+lastNumber;
    //   // console.log("test")
    //   // }
    // }

  if ((this.isLastNameIncorrect || this.isNameIncorrect || this.isPhoneNumberIncorrect) || (formControl.firstName.value === "" && formControl.lastName.value === "" && formControl.phoneNumber.value === "") || (formControl.firstName.value == null && formControl.lastName.value == null && formControl.phoneNumber.value == null)){
    return;
  }
  console.log(lastNumber)
  this.userService
    .changePersonalData({firstName:formControl.firstName.value,lastName:formControl.lastName.value,phoneNumber:formControl.phoneNumber.value})
    .subscribe({
      next:value => {
        if (value.body != null) {
          this.booleanService
            .user = value.body;
        }

      },
      error:err => {
        let message:string= "";
        console.log(err)
        Array.from(err.error)
          .forEach(value => {
            // @ts-ignore
            let defaultMessage = value.defaultMessage.toString();
            // @ts-ignore
            let field = value.field.toString().toLowerCase() === 'firstname' ? 'first name' :
              // @ts-ignore
              value.field.toString().toLowerCase() === 'lastname' ? 'last name' :
                // @ts-ignore
                value.field.toString().toLowerCase() === 'phonenumber' ? 'phone number' : value.field.toString().toLowerCase();

            message += `${field + ' : ' + defaultMessage}|`;

            // @ts-ignore
            value.code === "isSameNewPasswords" ? this.isNewPasswordAndConfirmPasswordSame = true : '';

            // @ts-ignore
            value.code === "isCurrentPasswordMatches" ? this.isCurrentPasswordIncorrect = true : '';

            // @ts-ignore
            value.field === "phoneNumber" ? this.isPhoneNumberIncorrect = true : '';

          });
        this.sharedService.showAlertMsg.error(`${message.slice(0, message.length - 1)}`);


        this.sharedService
          .showAlertMsg
          .error(FORM_ERROR_MSG);
      },
      complete:() => {
        this.updateUserInfo();
        this.sharedService
          .showAlertMsg
          .success(FORM_SUCCESSFUL_CHANGED_PERSONAL_DATA);
        form.resetForm();
      }
    })

  }

  changePassword(form: NgForm) {

    if (form.invalid) {

      let formControl = form.controls;

      let isSamePasswords: boolean;

      switch (formControl.currentPassword.status) {
        case 'INVALID':
          this.isCurrentPasswordIncorrect = true;
          break;
        case 'VALID':
          this.isCurrentPasswordIncorrect = false;
      }

      switch (formControl.confirmPassword.status) {
        case 'INVALID':
          this.isConfirmPasswordIncorrect = true;
          break;
        case 'VALID':
          this.isConfirmPasswordIncorrect = false;
          break;
      }

      switch (formControl.newPassword.status) {
        case 'INVALID':
          this.isNewPasswordIncorrect = true;
          break;
        case 'VALID':
          this.isNewPasswordIncorrect = false;
          break;
      }


      switch (formControl.confirmPassword.errors?.isSamePasswords) {
        case true:
          this.isNewPasswordAndConfirmPasswordSame = true;
          this.isConfirmPasswordIncorrect = true;
          isSamePasswords = false;
          break;
        default:
          isSamePasswords = true;
      }

      this.sharedService
        .showAlertMsg
        .error(FORM_ERROR_MSG + " " + (isSamePasswords ? "" : FORM_PASSWORDS_ARE_NOT_MATCH_MSG));

      return;
    }

    if (form.controls.newPassword.value === form.controls.currentPassword.value) {
      this.isCurrentPasswordDifferentThanNewPassword = true;
      this.sharedService
        .showAlertMsg
        .error("NEW PASSWORD MUST BE DIFFERENT THAN CURRENT PASSWORD!");
      return;
    } else {
      this.isCurrentPasswordDifferentThanNewPassword = false;
    }

    this.restartAllFields();

    this.userService.changePassword(form.value)
      .subscribe({
        next: value => {
          if (value.body != null)
            this.booleanService.user = value.body;
        },
        error: err => {
          console.log(err)

          let message = '';

          Array.from(err.error)
            .forEach(value => {
              // @ts-ignore
              let defaultMessage = value.defaultMessage.toString();
              // @ts-ignore
              let field = value.field.toString().toLowerCase() === 'newpassword' ? 'new password' :
                // @ts-ignore
                value.field.toString().toLowerCase() === 'confirmpassword' ? 'confirm password' :
                  // @ts-ignore
                  value.field.toString().toLowerCase() === 'currentpassword' ? 'current password' : value.field.toString().toLowerCase();

              message += `${field + ' : ' + defaultMessage}|`;

              // @ts-ignore
              value.code === "isSameNewPasswords" ? this.isNewPasswordAndConfirmPasswordSame = true : '';

              // @ts-ignore
              value.code === "isCurrentPasswordMatches" ? this.isCurrentPasswordIncorrect = true : '';

            });
          this.sharedService.showAlertMsg.error(`${message.slice(0, message.length - 1)}`);
        },
        complete: () => {
          this.sharedService
            .showAlertMsg
            .success(FORM_SUCCESSFUL_CHANGED_PASSWORD);

          this.updateUserInfo();
        }
      })

  }

  restartAllFields = () => {
    // PASSWORD
    this.isCurrentPasswordIncorrect = false;
    this.isConfirmPasswordIncorrect = false;
    this.isNewPasswordAndConfirmPasswordSame = false;
    this.isNewPasswordIncorrect = false;

    // // PERSONAL INFO
    // this.isPhoneNumberIncorrect = false;
    // this.isLastNameIncorrect = false;
    // this.isNameIncorrect = false;
  }

}
