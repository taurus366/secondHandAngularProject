import { Component, OnInit } from '@angular/core';
import {BooleansService} from "../../shared/booleans.service";

@Component({
  selector: 'app-aside-main',
  templateUrl: './aside-main.component.html',
  styleUrls: ['./aside-main.component.css']
})
export class AsideMainComponent implements OnInit {

  showProfileWindow : boolean = true;
  showAddressesWindow : boolean = false;
  showReturnWindow : boolean = false;
  showPromoCodesWindow : boolean = false;
  showOrdersWindow : boolean = false;


  constructor(public showText : BooleansService) { }

  ngOnInit(): void {
    this.showText.showProfileTextOnHeader = true;
    this.showText.setProfileTextName = 'PROFILE';
  }

  visibleProfileWindow() : void {
    this.hideAllWindows();
    this.showProfileWindow = true;
    this.showText.setProfileTextName = 'PROFILE';
  }

  visibleAddressesWindow() : void {
    this.hideAllWindows();
    this.showAddressesWindow = true;
    this.showText.setProfileTextName = 'ADDRESSES';
  }

  visibleReturnWindow() : void {
    this.hideAllWindows();
    this.showReturnWindow = true;
    this.showText.setProfileTextName = 'RETURN';
  }

  visiblePromoCodesWindow() : void {
    this.hideAllWindows();
    this.showPromoCodesWindow = true;
    this.showText.setProfileTextName = 'MY PROMO CODES';
  }

  visibleOrdersWindow() : void {
    this.hideAllWindows();
    this.showOrdersWindow = true;
    this.showText.setProfileTextName = 'ORDERS';
  }

  hideAllWindows() : void {
    this.showProfileWindow = false;
    this.showAddressesWindow = false;
    this.showReturnWindow = false;
    this.showOrdersWindow = false;
    this.showPromoCodesWindow = false;
    this.showText.setProfileTextName = ' ';
  }

}
