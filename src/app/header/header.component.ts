import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {UserService} from "../user-service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  hideWomenArticle: boolean = false;
  hideMenArticle: boolean = false;
  hideChildrenArticle: boolean = false;
  hideShoesArticle: boolean = false;
  hideAccessoriesArticle: boolean = false;

  cartItemCounter = 1;
  likedItemCounter = 3;

  hideHeartTextDropDown = false;
  hideCartTextDropDown = false;
  hideGuestUserTextDropDown = false;

  // @Output() showPopupWindow = new EventEmitter();

  constructor(public userService:UserService) {
  }

  ngOnInit(): void {
  }

  cleanHiddenArticle(): void {
    this.hideWomenArticle = false;
    this.hideMenArticle = false;
    this.hideChildrenArticle = false;
    this.hideShoesArticle = false;
    this.hideAccessoriesArticle = false;

    this.hideCartTextDropDown = false;
    this.hideGuestUserTextDropDown = false;
    this.hideHeartTextDropDown = false;
  }

  showItem(itemMenu: HTMLAnchorElement | HTMLElement): void {


    let {textContent: text, classList: className} = itemMenu;
    switch (text) {
      case 'Women':
        this.cleanHiddenArticle();
        this.hideWomenArticle = true;
        break;
      case 'Men':
        this.cleanHiddenArticle();
        this.hideMenArticle = true;
        break;
      case 'Children':
        this.cleanHiddenArticle();
        this.hideChildrenArticle = true;
        break;
      case 'Shoes':
        this.cleanHiddenArticle();
        this.hideShoesArticle = true;
        break;
      case 'Accessories':
        this.cleanHiddenArticle();
        this.hideAccessoriesArticle = true;
        break;
    }

    switch (className.item(1)) {
      case 'fa-user':
        this.cleanHiddenArticle();
        this.hideGuestUserTextDropDown = true;
        break;
      case 'fa-shopping-bag':
        this.cleanHiddenArticle();
        this.hideCartTextDropDown = true;
        break;
      case 'fa-heart':
        this.cleanHiddenArticle();
        this.hideHeartTextDropDown = true;
        break;
    }

  }


  showLoginRegisterWindow(event: MouseEvent) {
    event.preventDefault();
    // this.showPopupWindow.emit();
    this.userService.unhideLoginRegisterWindow();
    console.log("clicked")
  }
}
