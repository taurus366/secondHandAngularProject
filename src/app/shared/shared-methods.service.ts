import {Injectable} from '@angular/core';
import {UserService} from "../authentication/user.service";
import {BooleansService} from "./booleans.service";
import {SharedService} from "./shared.service";

@Injectable({
  providedIn: 'root'
})
export class SharedMethodsService {

  constructor(private userService: UserService, private booleanService: BooleansService, private sharedService: SharedService) {
  }


  populateUserInfoThenAddresses():  Promise<void> {

    return new Promise<void>((resolve, reject) => {

      if (this.booleanService.user == undefined) {
        this.populateUserInfo().catch(reject)
          .then(value => {
            this.populateUserAddresses().then(resolve);
          });
      } else {
      this.populateUserAddresses().then(resolve);
      }
    });


  }

  populateUserInfo(): Promise<void> {

    return new Promise<void>((resolve1, reject) => {
      this.userService
        .populateUserInfo()
        .subscribe({
          next: value => {
            if (value.body != null) {
              this.booleanService.user = value.body;
            }
          },
          error: err => {
            this.sharedService.showAlertMsg.error(err.error());
            reject();
          },
          complete: () => {
            resolve1();
          }
        })

    });

  }

  populateUserAddresses(): Promise<void> {

    return new Promise<void>((resolve, reject) => {

      this.userService
        .populateUserAddresses()
        .subscribe({
          next: value => {

            if (value.body != null) {
              this.booleanService.user!.addresses = value.body.addresses;
              this.booleanService.user!.speedyAddressList = value.body.speedyAddressList;
            }
          },
          error: err => {
            this.sharedService.showAlertMsg.error(err.error());
            reject();
          },
          complete: () => {
            resolve();
          }
        })

    });
  }

}
