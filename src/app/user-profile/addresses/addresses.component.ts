import {Component, OnInit} from '@angular/core';

import {AbstractControl, FormControl, NgForm as NgForm, NgModel, Validator, Validators} from '@angular/forms';
import {UserService} from "../../authentication/user.service";
import {ICITY} from "../../shared/interfaces/ICITY";
import {SharedService} from "../../shared/shared.service";
import {IUSER} from "../../shared/interfaces/IUSER";
import {BooleansService} from "../../shared/booleans.service";
import {IADDRESS} from "../../shared/interfaces/IADDRESS";
import {IADDRESSSPEEDY} from "../../shared/interfaces/IADDRESSSPEEDY";

let FORM_ERROR_MSG: string = "Please check RED BORDERS";
let FORM_SUCCESSFUL_CHANGED_ADDRESS: string = "";
let FORM_SUCCESSFUL_DELETED_ADDRESS: string = "";

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

  //CITY PREDICTION (HELPER)
  cityPrediction: ICITY[] | undefined;
  // choosedCity: ICITY | undefined;
  chosenCityId: number | undefined;

  showCityPrediction: boolean = false;
  choosedCity: boolean = false;

  // SPEEDY CITY PREDICTION (HELPER)
  showAddressPrediction: boolean = false; // only for Speedy Address
  showSpeedyCityPrediction: boolean = true; // changed to showCityPrediction
  selectedSpeedyAddressOfficeId: number | undefined;
  // speedyCityPrediction:

  isPhoneIncorrect: boolean = false;
  isFirstNameIncorrect: boolean = false;
  isLastNameIncorrect: boolean = false;
  isCityIncorrect: boolean = false;
  isSpeedyAddressIncorrect: boolean = false;

  user: IUSER | undefined;
  userEditAddress: IADDRESS | undefined;
  // ADDRESS HELPER
  speedyAddress: IADDRESSSPEEDY[] | undefined;

  constructor(private userService: UserService, private sharedService: SharedService, private booleanService: BooleansService) {
  }

  ngOnInit() {
    // this.updateInfoUser(); relocated into down method!
    this.checkUserAddressesExistsThenUpdate();
    FORM_SUCCESSFUL_CHANGED_ADDRESS = this.sharedService.formMessages.FORM.FORM_SUCCESSFUL_CHANGED_ADDRESS;
    FORM_SUCCESSFUL_DELETED_ADDRESS = this.sharedService.formMessages.FORM.FORM_SUCCESSFUL_DELETED_ADDRESS;
  }

  updateInfoUser() {
    this.user = this.booleanService.user;
  }

  checkUserAddressesExistsThenUpdate() {

    //  TODO -> get user addresses from Back End side / get user speedy addresses from Back End side
    // @ts-ignore
    if (this.booleanService.user == undefined || this.booleanService.user!.addresses.length == 0 || this.booleanService.user?.speedyAddressList.length == 0) {

      let promise = new Promise<void>((resolve, reject) => {

        this.userService
          .populateUserAddresses()
          .subscribe({
            next: value => {

              if (value.body != null || value.body != undefined) {
                  if (this.booleanService.user != null || this.booleanService.user != undefined){
                    this.booleanService.user!.addresses = value.body?.addresses;
                    this.booleanService.user!.speedyAddressList = value.body?.speedyAddressList;
                  } else {
                    this.booleanService.user = value.body;
                  }

                // this.booleanService.user!.addresses = value.body!.addresses;
                // this.booleanService.user!.speedyAddressList = value.body!.speedyAddressList;

              }
            },
            error: err => {
              reject(err);
            },
            complete: () => {
              resolve();
            }
          })

      });
      promise
        .then(() => this.updateInfoUser()).catch(reason => {
        this.sharedService
          .showAlertMsg
          .error(reason.message)

      })
    } else {
      this.updateInfoUser();
    }

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

    // IN PROGRESS YET!
    // @ts-ignore
    this.userService.createNewOwnAddress({
      apartment: formControl.apartment.value,
      block: formControl.block.value,
      city: formControl.city.value,
      detailsAboutAddress: formControl.detailsAboutAddress.value,
      entry: formControl.entry.value,
      firstName: formControl.firstName.value,
      floor: formControl.floor.value,
      lastName: formControl.lastName.value,
      municipality: formControl.municipality.value,
      neighborhood: formControl.neighborhood.value,
      phoneNumber: formControl.phoneNumber.value,
      street: formControl.street.value,
      streetNumber: formControl.streetNumber.value,
      zip: formControl.zip.value
    })
      .subscribe({
        // should return added address ! then add it to others
        next: value => {
          if (value.body != null) {

            this.booleanService
              .user?.addresses.push(value.body);
            this.updateInfoUser();

          }
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
            .success("Added new address");
        }
      })

  }

  editAddress(editAddressForm: NgForm) {
    // ADD ID OF THE ADDRESS!
    editAddressForm.form.addControl('id', new FormControl(this.userEditAddress?.id));

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
      .editCurrentOwnAddress({
        apartment: formControl.editApartment.value,
        block: formControl.editBlock.value,
        city: formControl.editCity.value,
        detailsAboutAddress: formControl.editDetailsAboutAddress.value,
        entry: formControl.editEntry.value,
        firstName: formControl.editFirstName.value,
        floor: formControl.editFloor.value,
        lastName: formControl.editLastName.value,
        municipality: formControl.editMunicipality.value,
        neighborhood: formControl.editNeighborhood.value,
        phoneNumber: formControl.editPhoneNumber.value,
        street: formControl.editStreet.value,
        streetNumber: formControl.editStreetNumber.value,
        zip: formControl.editZip.value,
        id: formControl.id.value
      })
      .subscribe({
        next: value => {

          if (value.body != null) {
            this.booleanService.changeCurrentUserOneOwnAddress(value.body);
            this.updateInfoUser();
          }
        },
        error: err => {
          this.sharedService
            .showAlertMsg
            .error(err.message())
        },
        complete: () => {
          this.sharedService
            .showAlertMsg
            .success(FORM_SUCCESSFUL_CHANGED_ADDRESS);

          //    HIDE ADDRESS CHANGE WINDOW
          this.hideAllForms();
        }
      })

  }

  deleteAddressById(addressId: number): void {

    this.userService
      .deleteAddressById({id: addressId})
      .subscribe({
        error: err => {
          this.sharedService
            .showAlertMsg.error(err.message());
        },
        complete: () => {
          this.booleanService
            .removeUserOneOwnAddress(addressId);

          this.updateInfoUser();

          this.sharedService
            .showAlertMsg
            .success(FORM_SUCCESSFUL_DELETED_ADDRESS);
        }
      })

  }

  speedyNewAddress(speedyNewAddressForm: NgForm) {

    let formControl = speedyNewAddressForm.form.controls;

    if (speedyNewAddressForm.invalid) {

      switch (formControl.firstName.status) {
        case "INVALID":
          this.isFirstNameIncorrect = true;
          break;
        case "VALID":
          this.isFirstNameIncorrect = false;
          break;
      }

      switch (formControl.lastName.status) {
        case "INVALID":
          this.isLastNameIncorrect = true;
          break;
        case "VALID":
          this.isLastNameIncorrect = false;
          break;
      }

      switch (formControl.phone.status) {
        case "INVALID":
          this.isPhoneIncorrect = true;
          break;
        case "VALID":
          this.isPhoneIncorrect = false;
          break;
      }

      switch (formControl.city.status) {
        case "INVALID":
          this.isCityIncorrect = true;
          break;
        case "VALID":
          this.isCityIncorrect = false;
          break;
      }

      // SPEEDY OFFICE ADDRESS
      switch (formControl.officeSpeedy.status) {
        case "INVALID":
          this.isSpeedyAddressIncorrect = true;
          break;
        case "VALID":
          this.isSpeedyAddressIncorrect = false;
          break;
      }

      this.sharedService
        .showAlertMsg
        .error(FORM_ERROR_MSG)

      return;
    }

    this.restartAllFields();
    console.log(formControl.firstName.value)
    this.userService.createOfficeSpeedyAddress({
      cityId: this.chosenCityId!,
      speedyOfficeId: this.selectedSpeedyAddressOfficeId!,
      firstName: formControl.firstName.value,
      lastName: formControl.lastName.value,
      phoneNumber: formControl.phone.value
    })
      .subscribe({
        next: value => {
          if (value.body != null) {
            this.booleanService
              .user?.speedyAddressList.push(value.body)
            this.updateInfoUser();
          }
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
            .success("Added new office address");
        }
      })


  }

  // FORM METHODS ///////////////////////////////////////////////////////

  // IN PROGRESS!

  // GET CITY ABOUT USER OR SPEEDY
  getCity(city: any, ...type: string[]) {

    // DETERMINE IF IT IS SPEEDY CITY OR USER CITY
    let theLastType = type.length > 0 && type[0] === 'speedy' ? this.userService
      .getLocation({location: '', speedy: city.value}) : this.userService
      .getLocation({location: city.value, speedy: ''});

    if (!this.choosedCity) {

      theLastType
        .subscribe({
          next: value => {

            this.cityPrediction = value;
          },
          error: err => {
            this.sharedService
              .showAlertMsg
              .error(err.message)
          },
          complete: () => {
            this.visibleCityPrediction();
          }
        });


    } else {
      this.choosedCity = false;
    }
  };

  // // GET CITY ABOUT SPEEDY
  // getAddressSpeedy(cityID: number) {
  //
  //   this.userService
  //     .getAddressByCityId(cityID)
  //     .subscribe({
  //       next: value => {
  //       },
  //       error: err => {
  //       },
  //       complete: () => {
  //       }
  //     })
  //
  // }

  //Get City's address by city name [Speedy]
  getAddress(city: any) {

    this.userService
      .getAddressByCityId(city.id)
      .subscribe({
        next: value => {
          this.speedyAddress = value;
        },
        error: err => {
          this.sharedService
            .showAlertMsg
            .error(err.message)
        },
        complete: () => {
          this.visibleAddressPrediction();
        }
      })
  };

  chosenCity(id: number, form: NgForm): void {
    let city: ICITY | undefined = this.cityPrediction?.find(el => el.id == id);
    this.hideCityPrediction();
    this.choosedCity = true;

    if (form.form.controls.officeSpeedy !== undefined) {
      form.form.controls.city.setValue(city?.city);
      this.getAddress(city);
      this.visibleAddressPrediction();
      this.selectedSpeedyAddressOfficeId = city?.id!;
    } else if (form.form.controls.city !== undefined) {
      form.form.controls.city.setValue(city?.city);
      form.form.controls.municipality.setValue(city?.region);
      form.form.controls.zip.setValue(city?.postCode);
    } else {
      form.form.controls.editCity.setValue(city?.city);
      form.form.controls.editMunicipality.setValue(city?.region);
      form.form.controls.editZip.setValue(city?.postCode);
    }

    this.chosenCityId = city?.id;
  }

  //CHOSEN SPEEDY ADDRESS
  chosenAddress(id: number, form: NgForm): void {
    let address: IADDRESSSPEEDY | undefined = this.speedyAddress?.find(el => el.id == id);
    form.form.controls.officeSpeedy.setValue(address?.name);
    this.selectedSpeedyAddressOfficeId = id;

    //HIDE ADDRESS PREDICTION AFTER SELECTED ADDRESS FROM ADDRESS HELPER WINDOW
    this.hideAddressPrediction();
  }

  visibleCityPrediction(): void {
    this.showCityPrediction = true;
  }

  hideCityPrediction(): void {
    this.showCityPrediction = false;
  }

  restartCityPrediction(): void {
    this.cityPrediction = [];
  }

  visibleAddressPrediction(): void {
    this.showAddressPrediction = true;
  }

  hideAddressPrediction(): void {
    this.showAddressPrediction = false;
  }

  restartAllFields(): void {
    this.isPhoneIncorrect = false;
    this.isLastNameIncorrect = false;
    this.isFirstNameIncorrect = false;
    this.isCityIncorrect = false;
    this.isSpeedyAddressIncorrect = false;
  }
}
