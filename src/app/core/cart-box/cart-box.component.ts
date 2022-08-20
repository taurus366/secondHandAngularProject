import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {UserService} from "../../authentication/user.service";
import {BooleansService} from "../../shared/booleans.service";
import {SharedService} from "../../shared/shared.service";
import {ICLOTH} from "../../shared/interfaces/ICLOTH";

let CART_DELETE_ERROR : string = "";
let CART_DELETE_SUCCESSFUL : string = "";



@Component({
  selector: 'app-cart-box',
  templateUrl: './cart-box.component.html',
  styleUrls: ['./cart-box.component.css']
})


export class CartBoxComponent implements OnInit {

  @Output() eventEmitterForClickedNext = new EventEmitter<void>();



  constructor(public userService:UserService , public booleansService:BooleansService, private sharedService:SharedService) { }

   ngOnInit() {
     this.userService
       .populateUserCartBoxAndCounter();

      CART_DELETE_ERROR = this.sharedService.formMessages.CART.CART_DELETE_ERROR;
      CART_DELETE_SUCCESSFUL = this.sharedService.formMessages.CART.CART_DELETE_SUCCESSFUL;
  }

  removeClientCartThenRefreshTheCart(cloth : ICLOTH) {

    let id :number = cloth.id;

    this.userService
      .removeItemFromCart({id})
      .subscribe({
        next: value => {

          this.booleansService
            .removeItemFromCartThenUpdate(cloth.id);

            this.sharedService
              .showAlertMsg
              .success(CART_DELETE_SUCCESSFUL);

        },
        error: err => {

            this.sharedService
              .showAlertMsg
              .error(CART_DELETE_ERROR);

        },
        complete: () => {}
      })
  }

  // in bag after click next for make order  then I must hide bag window
  clickedNextBtn(): void {
    this.eventEmitterForClickedNext.emit();
  }
}
