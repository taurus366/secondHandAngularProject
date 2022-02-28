import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {UserService} from "../user.service";
import {NgForm as NgForm} from '@angular/forms';
import {BooleansService} from "../../shared/booleans.service";
import {SharedService} from "../../shared/shared.service";


@Component({
  selector: 'app-login-window',
  templateUrl: './login-window.component.html',
  styleUrls: ['./login-window.component.css']
})
export class LoginWindowComponent implements OnInit {

  @Output() isForgottenEventEmitter = new EventEmitter();


  constructor(private userService: UserService, private booleanService: BooleansService, private sharedService: SharedService) {
  }

  login(form: NgForm): void {

    // if (form.invalid) {
    //   return;
    // }
    console.log("login clicked!")
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
          console.log(err.status);
          this.booleanService.setIsLoggedFalse();
          this.booleanService.setIsAdminFalse();
          err.status === 401 ? this.sharedService.showAlertMsg.error("Email or Password are not valid!") : 'something goes wrong!';
        },
        complete: () => {
          this.booleanService.setIsLoggedTrue();
          this.booleanService.hideShowLoginRegisterWindow();
          this.sharedService.showAlertMsg.success("Successfully logged!")

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
