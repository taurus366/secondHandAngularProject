import {Component, OnInit} from '@angular/core';
import {IADDRESS} from "../../shared/interfaces/IADDRESS";
import {BooleansService} from "../../shared/booleans.service";
import {UserService} from "../../authentication/user.service";

@Component({
  selector: 'app-order-address-payment',
  templateUrl: './order-address-payment.component.html',
  styleUrls: ['./order-address-payment.component.css']
})
export class OrderAddressPaymentComponent implements OnInit {

  // IF IT's null or undefined then I MUST CALL TO API FOR ADDRESS
  addresses: IADDRESS[] | undefined;

  constructor(private booleanService: BooleansService, private userService: UserService) {
  }

  ngOnInit(): void {

    this.populateUserAddressIfNull();
    this.t()
  }


  // I MUST EDIT THESE CODES , THERE ARE A LOT OF BUGS!
  populateUserAddressIfNull(): void {
    console.log(this.booleanService.user)
    // @ts-ignore
    if ((this.booleanService.user?.addresses != undefined && this.booleanService.user?.addresses.length == 0) || this.booleanService.user?.addresses == undefined) {
      console.log("te")
      this.userService.populateUserAddresses()
        .subscribe({
          next: value => {
            if (this.booleanService.user != undefined && value.body?.addresses != null) {
              console.log("te3")
              this.booleanService.user!.addresses = value.body!.addresses;
            } else if (this.booleanService.user == undefined) {

            }

          }

        })
    }
    console.log("te2")
    this.addresses = this.booleanService.user?.addresses;
  }

  t() {
    console.log(this.addresses?.length)
  }
}
