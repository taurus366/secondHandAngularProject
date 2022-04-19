import {Component, OnInit} from '@angular/core';

import {NgForm as NgForm} from '@angular/forms';
import {UserService} from "../../authentication/user.service";
import {ICITY} from "../../shared/interfaces/ICITY";
import {SharedService} from "../../shared/shared.service";
import {IUSER} from "../../shared/interfaces/IUSER";
import {BooleansService} from "../../shared/booleans.service";
import {IADDRESS} from "../../shared/interfaces/IADDRESS";

let FORM_ERROR_MSG: string = "Please check RED BORDERS";

@Component({
  selector: 'app-addresses',
  templateUrl: './addresses.component.html',
  styleUrls: ['./addresses.component.css']
})
export class AddressesComponent implements OnInit {

  showOwnNewAddressForm: boolean = false;
  showOwnEditAddressForm: boolean = false;
  showOfficeNewAddressForm: boolean = false;
  showOfficeEditAddressForm: boolean = false;

  cityPrediction: ICITY[] | undefined;
  // choosedCity: ICITY | undefined;
  choosedCityId: number | undefined;
  showCityPrediction: boolean = false;
  choosedCity: boolean = false;

  isPhoneIncorrect: boolean = false;
  isFirstNameIncorrect: boolean = false;
  isLastNameIncorrect: boolean = false;
  isCityIncorrect: boolean = false;

  user: IUSER | undefined;
  userEditAddress: IADDRESS | undefined;

  constructor(private userService: UserService, private sharedService: SharedService, private booleanService: BooleansService) {
  }

  ngOnInit(): void {
    this.updateInfoUser();
  }

  updateInfoUser() {
    this.user = this.booleanService.user;
  }

  visibleOwnNewAddressForm(): void {
    // this.preventDefaultFunction(event);
    this.hideAllForms();
    this.showOwnNewAddressForm = true;
    // clean choosedCity every time open
    // this.choosedCity = undefined;
  }

  visibleOwnEditAddressForm(): void {
    this.hideAllForms();
    this.showOwnEditAddressForm = true;
  }

  visibleOfficeEditAddressForm(): void {
    this.hideAllForms();
    this.showOfficeEditAddressForm = true;
  }

  // hideOwnNewAddressForm() : void {
  //   this.showOwnNewAddressForm = false;
  // }

  visibleOfficeNewAddressForm(): void {
    // this.preventDefaultFunction(event);
    this.hideAllForms();
    this.showOfficeNewAddressForm = true;
  }

  hideAllForms(): void {
    this.showOwnNewAddressForm = false;
    this.showOwnEditAddressForm = false;
    this.showOfficeNewAddressForm = false;
    this.showOfficeEditAddressForm = false;
    //WHEN OPEN SOME FORM LIKE < NEW ADDRESS OR EDIT ADDRESS> FIELDS SHOULD RESET TO REUSE THEM!
    this.restartAllFields();
  }

  // hideOfficeNewAddressForm() : void {
  //   this.showOfficeNewAddressForm = false;
  // }

  preventDefaultFunction(event: MouseEvent): void {
    event.preventDefault();
  }

  // FIND THE EXISTING ADDRESS FROM ARRAY THEN SET IT TO [userEditAddress]
  editAddressId(addressId: number) {

    // this.userEditAddress = this.user?.addresses.find(ad => ad.id = addressId);
    this.user?.addresses
      .forEach(value => {
        if (value.id === addressId) {
          this.userEditAddress = value;
          return;
        }
      })
    console.log(this.userEditAddress);

  }

  // FORM METHODS ///////////////////////////////////////////////////////

  ownNewAddress(ownNewAddressForm: NgForm) {

    console.log(ownNewAddressForm.form.controls);

    let formControl = ownNewAddressForm.form.controls;

    if (ownNewAddressForm.invalid) {

      switch (formControl.lastName.status) {
        case 'INVALID':
          this.isLastNameIncorrect = true;
          break;
        case "VALID":
          this.isLastNameIncorrect = false;
          break
      }

      switch (formControl.firstName.status) {
        case 'INVALID':
          this.isFirstNameIncorrect = true;
          break;
        case "VALID":
          this.isFirstNameIncorrect = false;
          break
      }

      switch (formControl.phoneNumber.status) {
        case 'INVALID':
          this.isPhoneIncorrect = true;
          break;
        case "VALID":
          this.isPhoneIncorrect = false;
          break
      }

      switch (formControl.city.status) {
        case 'INVALID':
          this.isCityIncorrect = true;
          break;
        case "VALID":
          this.isCityIncorrect = false;
          break
      }

      this.sharedService
        .showAlertMsg
        .error(FORM_ERROR_MSG);


      return
    }
    this.restartAllFields();
    console.log(ownNewAddressForm.form.controls.municipality.value)

    // IN PROGRESS YET!
    // @ts-ignore
    this.userService.createNewAddress({
      apartment: formControl.apartment.value, block: formControl.block.value,
      city: formControl.city.value,
      detailsAboutAddress: formControl.detailsAboutAddress.value,
      entry: formControl.entry.value,
      firstName: formControl.firstName.value,
      floor: formControl.floor.value,
      lastName: formControl.lastName.value,
      municipality: formControl.municipality.value,
      neighborhood: formControl.neighborhood.value,
      phoneNumber:formControl.phoneNumber.value,
      street: formControl.street.value,
      streetNumber: formControl.streetNumber.value,
      zip: formControl.zip.value
    })
      .subscribe({
        // should return added address ! then add it to others
        next: value => {
          console.log(value)
        },
        error: err => {
          if (err.status === 409) {
            this.sharedService
              .showAlertMsg
              .error(err.error);
          }
        },
        complete: () => {
          this.hideAllForms();
          this.sharedService
            .showAlertMsg
            .success("Added new address")
        }
      })

  }

  editAddress(editAddressForm: NgForm) {

    let formControl = editAddressForm.form.controls;
    console.log(formControl);

    if (editAddressForm.invalid) {

      switch (formControl.editLastName.status) {
        case 'INVALID':
          this.isLastNameIncorrect = true;
          break;
        case "VALID":
          this.isLastNameIncorrect = false;
          break
      }

      switch (formControl.editFirstName.status) {
        case 'INVALID':
          this.isFirstNameIncorrect = true;
          break;
        case "VALID":
          this.isFirstNameIncorrect = false;
          break
      }

      switch (formControl.editCity.status) {
        case 'INVALID':
          this.isCityIncorrect = true;
          break;
        case "VALID":
          this.isCityIncorrect = false;
          break
      }

      switch (formControl.editPhoneNumber.status) {
        case 'INVALID':
          this.isPhoneIncorrect = true;
          break;
        case "VALID":
          this.isPhoneIncorrect = false;
          break
      }


      return;
    }

    this.restartAllFields();

    this.userService
      .editCurrentAddress(editAddressForm.value)
      .subscribe({
        next: value => {

        },
        error: err => {
        },
        complete: () => {
        }
      })

  }

  // FORM METHODS ///////////////////////////////////////////////////////

  // IN PROGRESS!

  getCity(city: any) {

    if (!this.choosedCity) {
      console.log('changed')
      // SHOW WINDOW
      this.visibleCityPrediction();

      this.userService
        .getLocation({location: city.value})
        .subscribe({
          next: value => {
            console.log(value)

            this.cityPrediction = value;
          },
          error: err => {
          },
          complete: () => {
            this.visibleCityPrediction();
          }
        })

    } else {
      this.choosedCity = false;
    }


  }

  chosenCity(id: number, form: NgForm): void {
    let city: ICITY | undefined = this.cityPrediction?.find(el => el.id == id);
    this.hideCityPrediction();
    this.choosedCity = true;

    if (form.form.controls.city !== undefined) {
      form.form.controls.city.setValue(city?.city);
      form.form.controls.municipality.setValue(city?.region);
      form.form.controls.zip.setValue(city?.postCode);
    } else {
      form.form.controls.editCity.setValue(city?.city);
      form.form.controls.editMunicipality.setValue(city?.region);
      form.form.controls.editZip.setValue(city?.postCode);
    }

    this.choosedCityId = city?.id;
  }

  visibleCityPrediction(): void {
    this.showCityPrediction = true;
  }

  hideCityPrediction(): void {
    this.showCityPrediction = false;
  }

  restartAllFields(): void {
    this.isPhoneIncorrect = false;
    this.isLastNameIncorrect = false;
    this.isFirstNameIncorrect = false;
    this.isCityIncorrect = false;
  }
}
