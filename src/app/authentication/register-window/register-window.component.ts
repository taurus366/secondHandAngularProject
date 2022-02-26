import { Component, OnInit } from '@angular/core';
import {ApiConnectionServiceService} from '../../shared/api-connection-service.service';
import {NgForm} from "@angular/forms";
import {stringify} from "@angular/compiler/src/util";
import {UserService} from "../user.service";
import {BooleansService} from "../../shared/booleans.service";

@Component({
  selector: 'app-register-window',
  templateUrl: './register-window.component.html',
  styleUrls: ['./register-window.component.css']
})
export class RegisterWindowComponent implements OnInit {

  constructor(public userService: UserService,private booleanService:BooleansService) {

  }

  ngOnInit(): void {
  }

  register(form: NgForm) {

    this.userService.register(form.value)
      .subscribe({
        next:value => {
          value.body?.roles.forEach(role => {
            if (role.role === 'ADMINISTRATOR') {
              this.booleanService.setIsAdminTrue();
            }
          });
        },
        error:err => {
          console.log(err);
        },
        complete: () => {
          this.booleanService.setIsLoggedTrue()
          this.booleanService.hideShowLoginRegisterWindow();
        }
      })

  }
}
