import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {UserService} from "../authentication/user.service";
import {ICLOTH} from "../shared/interfaces/ICLOTH";
import {SharedService} from "../shared/shared.service";

@Component({
  selector: 'app-cloth-review',
  templateUrl: './cloth-review.component.html',
  styleUrls: ['./cloth-review.component.css']
})
export class ClothReviewComponent implements OnInit {

  constructor(protected activatedRoute: ActivatedRoute, private userService: UserService,public sharedService:SharedService) {
  }

  showPictureInMain : string | undefined;
  cloth:ICLOTH | undefined;

  ngOnInit(): void {
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
}
