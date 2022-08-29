import {Component, OnInit} from '@angular/core';
import {IADDRESS} from "../../shared/interfaces/IADDRESS";
import {BooleansService} from "../../shared/booleans.service";
import {UserService} from "../../authentication/user.service";
import {SharedMethodsService} from "../../shared/shared-methods.service";

@Component({
  selector: 'app-order-address-payment',
  templateUrl: './order-address-payment.component.html',
  styleUrls: ['./order-address-payment.component.css']
})
export class OrderAddressPaymentComponent implements OnInit {

  // IF IT's null or undefined then I MUST CALL TO API FOR ADDRESS
  addresses: IADDRESS[] | undefined;

  constructor(private booleanService: BooleansService, private userService: UserService, private sharedMethods: SharedMethodsService) {
  }

  ngOnInit(): void {

    this.populateUserAddressIfNull();

  }


  // Here I check if the user.address is undefined , if it is  then I populate it again like calling the REST API
  populateUserAddressIfNull(): void {
      // @ts-ignore
    if (this.booleanService.user == undefined || this.booleanService.user.addresses == undefined || this.booleanService.user.addresses.length == 0) {
        this.sharedMethods
          .populateUserInfoThenAddresses().then(r => this.populateUserAddresses());
      } else {
      this.populateUserAddresses();
    }

  }

  populateUserAddresses(): void {
   this.addresses = this.booleanService.user?.addresses;
  }


}
