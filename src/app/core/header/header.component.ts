import { Component, OnInit } from '@angular/core';
import {BooleansService} from "../../shared/booleans.service";
import {SharedService} from "../../shared/shared.service";


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
  showCartBox : boolean = false;


  cartItemCounter = 1;
  likedItemCounter = 3;

  hideHeartTextDropDown = false;
  hideCartTextDropDown = false;
  hideGuestUserTextDropDown = false;

  //REGISTER SECTION
  showRegisterLoginWindow = false;

  // @Output() showPopupWindow = new EventEmitter();

  constructor(public userService:BooleansService,public publicMethod:SharedService) {
  }

  checkStatusOfWindow(): boolean {
   return this.userService.checkStatusOfWindow();
  }

  ngOnInit(): void {
     // document.querySelector('body')!.addEventListener("click",this.clickEv.bind(this))
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


  showLoginRegisterWindow() {
    // event.preventDefault();
  //  this.publicMethod.preventDefault(event);
    // this.showPopupWindow.emit();
    this.userService.unhideLoginRegisterWindow();
    console.log("clicked")
  }



  // CART BOX HIDE LOGIC
  counter : number = 0;

  startListenCartBoxHide(){
    document.querySelector('body')!.addEventListener("click",this.clickEvCartBoxHide.bind(this));
  }

  clickEvCartBoxHide(event : MouseEvent, ...args:string[]) {

    this.counter ++ ;
    let isClickedOut: boolean = false;

    let eventTargetParrentClassList = (event.target as Element).parentElement!.classList;


    for (let i = 0; i < eventTargetParrentClassList.length; i++) {
      let classNames: String[] = eventTargetParrentClassList[i].split("-");

      classNames
        .forEach(value => {
          console.log(value)
         if (value === 'clothes' || value === 'cloth' || value === 'box'){
           isClickedOut = true;
         }
        })
    }

   if (!isClickedOut && this.showCartBox && args.length === 0 && this.counter > 1){
      this.showCartBox = false;
      this.counter = 0;
       document.querySelector('body')!.removeAllListeners!('click');
   }
  }
}
// CART BOX HIDE LOGIC



