import { Component, OnInit } from '@angular/core';
import {BooleansService} from "../../shared/booleans.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-aside-main',
  templateUrl: './aside-main.component.html',
  styleUrls: ['./aside-main.component.css']
})
export class AsideMainComponent implements OnInit {

  // showProfileWindow : boolean = true;
  // showAddressesWindow : boolean = false;
  // showReturnWindow : boolean = false;
  // showPromoCodesWindow : boolean = false;
  // showOrdersWindow : boolean = false;


  constructor(public booleansService : BooleansService) { }

  ngOnInit(): void {
    this.booleansService.showProfileTextOnHeader = true;
    this.booleansService.setProfileTextName = 'PROFILE';

  }

  //HERE I RESET THE HEADER TEXT WINDOW!
  canDeactivate(): Observable<boolean> | boolean {
    this.hideAllWindows();
    return true;
  }


  checkProfileWindow():boolean {
    return this.booleansService.showProfileWindow;
  }
  checkAddressesWindow():boolean{
    return this.booleansService.showAddressesWindow;
  }
  checkPromoCodesWindow():boolean {
    return this.booleansService.showPromoCodesWindow;
  }
  checkOrdersWindow():boolean{
    return this.booleansService.showOrdersWindow;
  }
  checkShowReturnWindow():boolean {
   return this.booleansService.showReturnWindow;
  }


  visibleProfileWindow() : void {
    this.hideAllWindows();
    this.booleansService.showProfileWindow = true;
    this.booleansService.setProfileTextName = 'PROFILE';
  }

  visibleAddressesWindow() : void {
    this.hideAllWindows();
    this.booleansService.showAddressesWindow = true;
    this.booleansService.setProfileTextName = 'ADDRESSES';
  }

  visibleReturnWindow() : void {
    this.hideAllWindows();
    this.booleansService.showReturnWindow = true;
    this.booleansService.setProfileTextName = 'RETURN';
  }

  visiblePromoCodesWindow() : void {
    this.hideAllWindows();
    this.booleansService.showPromoCodesWindow = true;
    this.booleansService.setProfileTextName = 'MY PROMO CODES';
  }

  visibleOrdersWindow() : void {
    this.hideAllWindows();
    this.booleansService.showOrdersWindow = true;
    this.booleansService.setProfileTextName = 'ORDERS';
  }

  hideAllWindows() : void {
    this.booleansService.showProfileWindow = false;
    this.booleansService.showAddressesWindow = false;
    this.booleansService.showReturnWindow = false;
    this.booleansService.showOrdersWindow = false;
    this.booleansService.showPromoCodesWindow = false;
    this.booleansService.setProfileTextName = ' ';
  }

}
