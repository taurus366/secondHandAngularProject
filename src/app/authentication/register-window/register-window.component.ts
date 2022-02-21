import { Component, OnInit } from '@angular/core';
import {ApiConnectionServiceService} from '../../shared/api-connection-service.service';
import {NgForm} from "@angular/forms";
import {stringify} from "@angular/compiler/src/util";
import {UserService} from "../user.service";

@Component({
  selector: 'app-register-window',
  templateUrl: './register-window.component.html',
  styleUrls: ['./register-window.component.css']
})
export class RegisterWindowComponent implements OnInit {

  constructor(public api: UserService) {

  }

  ngOnInit(): void {
  }

  registerOnSubmit(testForm: MouseEvent):void {
    testForm.preventDefault();

    // this.api.validateUserToken({
    //   email: "ali@abv.bg",
    //   password: "12345678",
    //   confirmPassword: "12345678",
    //   firstName:"ali",
    //   lastName:"ali",
    //   sex:"MALE"
    // })
    //   .subscribe(
    //     value => {
    //       console.log(value)
    //     },
    //     error => console.log(error)
    //   )
    this.api.validateUserToken();

    //   this.api.test({email:"ali@abv.bg", password:"12345678"})
    //     .subscribe(value => console.log(value))
    //
    // // }
  }
}
