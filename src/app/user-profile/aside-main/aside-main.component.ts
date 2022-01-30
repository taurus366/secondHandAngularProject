import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-aside-main',
  templateUrl: './aside-main.component.html',
  styleUrls: ['./aside-main.component.css']
})
export class AsideMainComponent implements OnInit {

  showProfileWindow : boolean = true;
  showAddressesWindow : boolean = false;
  showReturnWindow : boolean = false;


  constructor() { }

  ngOnInit(): void {
  }

  visibleProfileWindow() : void {
    this.hideAllWindows();
    this.showProfileWindow = true;
  }

  visibleAddressesWindow() : void {
    this.hideAllWindows();
    this.showAddressesWindow = true;
  }

  visibleReturnWindow() : void {
    this.hideAllWindows();
    this.showReturnWindow = true;
  }

  hideAllWindows() : void {
    this.showProfileWindow = false;
    this.showAddressesWindow = false;
    this.showReturnWindow = false;
  }

}
