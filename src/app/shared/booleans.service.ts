import {Injectable} from '@angular/core';
import {ICLOTH} from "./interfaces/ICLOTH";
import {ICLOTHES} from "./interfaces/ICLOTHES";
import {ClothesComponent} from "../clothes/clothes.component";
import {elementAt} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class BooleansService {

  constructor() {
  }

  clothes: ICLOTHES | undefined;

  likedOrUnlikedUpdateClothArray(cloth: ICLOTH | any) {
    if (this.clothes != null){
      this.clothes.content
        .find(el => el.id === cloth.id)!.likes! = cloth.likes;
    }

  }

  // USER CART
  cartBoxItems: ICLOTH[] | undefined;
  cartItemCounter: number = 0;
  totalPrice: number = 0;

  updateCartItemsThings(): void {
    this.cartItemCounter = this.cartBoxItems?.length!;
    this.totalPrice = this.cartBoxItems!.map(value => value.newPrice)
      .reduce((a, b) => a + b, 0);
  }

  addNewItemToExistsCartThenUpdate(newItem: ICLOTH) {
    this.cartBoxItems
      ?.push(newItem);
    this.updateCartItemsThings();
  }

  removeItemFromCartThenUpdate(itemID: number) {
    this.cartBoxItems = this.cartBoxItems!
      .filter(value => value.id !== itemID);

    this.updateCartItemsThings();
  }

  getUserCartBoxItems(): ICLOTH[] | undefined {
    return this.cartBoxItems;
  }

  getUserCartItemCounter(): number {
    return this.cartItemCounter;
  }

  getUserCartTotalPrice(): number {

    return this.totalPrice;
  }

  // USER CART END

  // USER LIKES
  likeBoxItems: ICLOTH[] | undefined;
  likedItemCounter: number = 0;
  // USER LIKES END

  updateLikeItemsThings() : void {
    this.likedItemCounter = this.likeBoxItems?.length!;
  }

  addNewItemToExistsLikeThenUpdate(newItem: ICLOTH) {
    this.likeBoxItems
      ?.push(newItem);
    this.updateLikeItemsThings();
  }

  removeItemFromLikeThenUpdate(item: ICLOTH) {
    this.likeBoxItems = this.cartBoxItems!
      .filter(value => value.id !== item.id);

    this.updateLikeItemsThings();

    // this.clothesComponent
    //   .likedOrUnlikedUpdateClothArray(item);
  }

  getUserLikeBoxItems(): ICLOTH[] | undefined {
    return this.likeBoxItems;
  }

  getUserLikesCounter(): number {
    return this.likedItemCounter;
  }



  // USER CART END

  //ADMIN OR USER LOGIN
  isLogged: boolean = false;
  isAdmin: boolean = false;

  setIsAdminFalse(): void {
    this.isAdmin = false;
  }

  setIsAdminTrue(): void {
    this.isAdmin = true;
  }

  getIsAdmin(): boolean {
    return this.isAdmin;
  }

  setIsLoggedFalse(): void {
    this.isLogged = false;
  }

  setIsLoggedTrue(): void {
    this.isLogged = true;
  }

  getIsLogged() {
    return this.isLogged;
  }

  //ADMIN OR USER LOGIN


  //PROFILE HEADER TEXT OPTIONS
  showProfileWindow: boolean = true;
  showAddressesWindow: boolean = false;
  showReturnWindow: boolean = false;
  showPromoCodesWindow: boolean = false;
  showOrdersWindow: boolean = false;
  showAdminClothWindow: boolean = false;


  showProfileTextOnHeader: boolean = false;
  setProfileTextName: string = '';


  //PROFILE HEADER TEXT OPTIONS


  showLoginRegisterWindow: boolean = false;

  hideShowLoginRegisterWindow(): void {
    this.showLoginRegisterWindow = false;
  };

  unhideLoginRegisterWindow(): void {
    this.showLoginRegisterWindow = true;
  }

  checkStatusOfWindow(): boolean {
    return this.showLoginRegisterWindow;
  }

//  SHOW LOADING PAGE
  private showOrHideLoadingPage: boolean = false;

  showLoadingPage(): void {
    this.showOrHideLoadingPage = true;
  }

  hideLoadingPage(): void {
    this.showOrHideLoadingPage = false;
  }

  checkLoadingPage(): boolean {
    return this.showOrHideLoadingPage;
  }

//  SHOW LOADING PAGE


}
