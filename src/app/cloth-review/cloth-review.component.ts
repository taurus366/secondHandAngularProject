import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {UserService} from "../authentication/user.service";
import {ICLOTH} from "../shared/interfaces/ICLOTH";
import {SharedService} from "../shared/shared.service";
import {BooleansService} from "../shared/booleans.service";

 let CART_ALREADY_ADDED : string = "";
 let CART_ADD_SUCCESSFUL : string = "";

@Component({
  selector: 'app-cloth-review',
  templateUrl: './cloth-review.component.html',
  styleUrls: ['./cloth-review.component.css']
})
export class ClothReviewComponent implements OnInit {

  constructor(protected activatedRoute: ActivatedRoute, private userService: UserService,public sharedService:SharedService, private booleanService:BooleansService) {
  }

  showPictureInMain : string | undefined;
  cloth:ICLOTH | undefined;

  ngOnInit(): void {
    CART_ALREADY_ADDED = this.sharedService.formMessages.CART.CART_ALREADY_ADDED;
    CART_ADD_SUCCESSFUL = this.sharedService.formMessages.CART.CART_ADD_SUCCESSFUL;

    this.activatedRoute.params.subscribe(({id}) => {
      this.userService
        .getClothById(id)
        .subscribe({
          next:value => {
            this.cloth = value;
            this.showPictureInMain = value.coverPicture.url;
          }
        })
    })


}

  addToCart(cloth: any) {

    this.userService
      .addItemToCart(cloth.id)
      .subscribe({
        next:value => {

          if (value.body != null){
            this.booleanService
              .addNewItemToExistsCartThenUpdate(value.body)

            this.sharedService
              .showAlertMsg
              .success(CART_ADD_SUCCESSFUL)
          }

        },
        error:err => {

          if (err.status === 400){
            this.sharedService
              .showAlertMsg
              .error(CART_ALREADY_ADDED);
          }
        },
        complete:() => {}
      })

  }
}
