import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-order-main',
  templateUrl: './order-main.component.html',
  styleUrls: ['./order-main.component.css']
})
export class OrderMainComponent implements OnInit {

  isFirstWindowShow: boolean = true;
  isSecondWindowShow: boolean = false;
  isThirdWindowShow: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  switchWindows(type: string): void {
    switch (type) {
      case 'next':
        if (this.isFirstWindowShow){
          this.showSecondWindow();
        } else if (this.isSecondWindowShow) {
          this.showThirdWindow();
        }
        break;
      case 'back':
        if (this.isThirdWindowShow) {
          this.showSecondWindow();
        } else if (this.isSecondWindowShow){
          this.showFirstWindow();
        }
        break;
    }

  }

  hideAllWindows(): void {
    this.isFirstWindowShow = false;
    this.isSecondWindowShow = false;
    this.isThirdWindowShow = false;
  }

  showFirstWindow(): void {
    this.hideAllWindows();
    this.isFirstWindowShow = true;
  }

  showSecondWindow(): void {
    this.hideAllWindows();
    this.isSecondWindowShow = true;
  }

  showThirdWindow(): void {
    this.hideAllWindows();
    this.isThirdWindowShow = true;
  }

}
