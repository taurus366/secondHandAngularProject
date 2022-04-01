import { Component, OnInit } from '@angular/core';
import {UserService} from "../../authentication/user.service";
import {SharedService} from "../../shared/shared.service";
import {ICLOTH} from "../../shared/interfaces/ICLOTH";
import {BooleansService} from "../../shared/booleans.service";

let LIKE_DELETE_ERROR : string = "";
let LIKE_DELETE_SUCCESSFUL : string = "";

@Component({
  selector: 'app-like-box',
  templateUrl: './like-box.component.html',
  styleUrls: ['./like-box.component.css']
})
export class LikeBoxComponent implements OnInit {

  constructor(private userService:UserService, private sharedService:SharedService, public booleanService:BooleansService) { }

  ngOnInit(): void {
    this.userService
      .populateUserLikeBoxAndCounter();

    LIKE_DELETE_ERROR = this.sharedService.formMessages.LIKE.LIKE_DELETE_ERROR;
    LIKE_DELETE_SUCCESSFUL = this.sharedService.formMessages.LIKE.LIKE_DELETE_SUCCESSFUL;

  }

  removeClientLikeThenRefreshTheLikeBox(cloth: ICLOTH) {
    let id: number = cloth.id;

    this.userService
      .removeItemFromLike({id})
      .subscribe( {
        next: value => {
          this.booleanService
            .removeItemFromLikeThenUpdate(cloth);

          if (value.body != null){
            this.booleanService
              .likedOrUnlikedUpdateClothArray(value.body);
          }

          this.sharedService
            .showAlertMsg
            .success(LIKE_DELETE_SUCCESSFUL);
        },
        error: err => {

          this.sharedService
            .showAlertMsg
            .error(LIKE_DELETE_ERROR);
        },
        complete: () => {}
      })

  }


}
