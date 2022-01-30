import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-addresses',
  templateUrl: './addresses.component.html',
  styleUrls: ['./addresses.component.css']
})
export class AddressesComponent implements OnInit {

  showOwnNewAddressForm : boolean = false;
  showOwnEditAddressForm : boolean = false;
  showOfficeNewAddressForm : boolean = false;
  showOfficeEditAddressForm : boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  visibleOwnNewAddressForm():void {
    // this.preventDefaultFunction(event);
    this.hideAllForms();
    this.showOwnNewAddressForm = true;

  }

  visibleOwnEditAddressForm():void {
    this.hideAllForms();
    this.showOwnEditAddressForm = true;
  }

  visibleOfficeEditAddressForm() : void {
    this.hideAllForms();
    this.showOfficeEditAddressForm = true;
  }

  // hideOwnNewAddressForm() : void {
  //   this.showOwnNewAddressForm = false;
  // }

  visibleOfficeNewAddressForm() : void {
    // this.preventDefaultFunction(event);
    this.hideAllForms();
    this.showOfficeNewAddressForm = true;
  }

  hideAllForms() : void {
    this.showOwnNewAddressForm = false;
    this.showOwnEditAddressForm = false;
    this.showOfficeNewAddressForm = false;
    this.showOfficeEditAddressForm  = false;
  }

  // hideOfficeNewAddressForm() : void {
  //   this.showOfficeNewAddressForm = false;
  // }

  preventDefaultFunction(event: MouseEvent) : void {
    event.preventDefault();
  }

}
