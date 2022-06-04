import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {IUSER} from "../shared/interfaces/IUSER";
import {BooleansService} from "../shared/booleans.service";
import {ICLOTHSENUMS} from "../shared/interfaces/ICLOTHSENUMS";
import {ICLOTHES} from "../shared/interfaces/ICLOTHES";
import {SharedService} from "../shared/shared.service";
import {ICLOTH} from "../shared/interfaces/ICLOTH";
import {ICART} from "../shared/interfaces/ICART";
import {ICITY} from "../shared/interfaces/ICITY";
import {IADDRESS} from "../shared/interfaces/IADDRESS";
import {IADDRESSSPEEDY} from "../shared/interfaces/IADDRESSSPEEDY";
import {ICITYADDRESSSPEEDY} from "../shared/interfaces/ICITYADDRESSSPEEDY";
import {IUSERSPEEDYADDRESS} from "../shared/interfaces/IUSERSPEEDYADDRESS";


// for lan connection
const apiUrlLan = environment.apiURL;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  clothEnum: ICLOTHSENUMS | undefined;


  // getIsLogged(): boolean {
  //   // HERE I MUST CALL API TO CHECK IF USER'S TOKEN ARE VALID
  //   return this.validateUserToken();
  // }

  constructor(private http: HttpClient, private booleanService: BooleansService, private sharedService: SharedService) {
  }

  //METHODS

  populateUserCartBoxAndCounter() {
    this.populateClientCartBox()
      .subscribe(value => {
        this.booleanService.cartBoxItems = value;
        this.booleanService.updateCartItemsThings();
      })
  }

  populateUserLikeBoxAndCounter() {
    this.populateClientLikeBox()
      .subscribe( value => {
        this.booleanService.likeBoxItems = value;
        this.booleanService.updateLikeItemsThings();
      })
  }

  getAllClothesEnumsForFields(): void {

    this.getAllFieldsForClothes()
      .subscribe({
        next: value => {
          this.clothEnum = value;

        },
        error: err => {
          this.sharedService
            .showAlertMsg
            .error(err)
        },
        complete: () => {
        }
      })
  }

  // METHODS END

  filterClothesType(gender: string, type?: string): string[] {
    let arrayNav: string[] = [];


    if (gender === 'ACCESSORIES') {
      this.clothEnum
        ?.accessoriesType.forEach(value => {
        let array = value.split("=")[1].split("/");
        array
          .forEach(value1 => {
            if (value1 === type) {
              arrayNav.push(value1);
            }
          })

      })
      return arrayNav;

    } else if (gender === 'SHOES') {
      this.clothEnum
        ?.shoesType.forEach(value => {
        let array = value.split("=")[1].split("/");
        array
          .forEach(value1 => {
            if (value1 === type) {
              arrayNav.push(value1);
            }
          })

      })
      return arrayNav;

    } else {

      this.clothEnum
        ?.clothType.forEach(value => {
        let strings = value.split("=");
        strings[1].split("/")
          .forEach(value1 => {
            if (value1 === gender) {
              arrayNav.push(this.sharedService.capitalizeFirstLetter(strings[0]));
            }

          })
      })
      return arrayNav;

    }

  }

  login(data: { email: string, password: string }) {
    // HERE I MUST CALL API FOR LOGIN THE USER THEN SAVE RECEIVED USER INFO
    return this.http.post<IUSER>(`${apiUrlLan}/users/login`, data, {
      observe: 'response',
      // withCredentials: true,
      // headers: {
      //   'Content-type': 'application/json'
      // },
      // responseType: 'json'
    })
  };

  register(data: { email: string, password: string, confirmPassword: string, sex: string, firstName: string, lastName: string }) {
    //  HERE I MUST CALL API FOR REGISTER NEW USER THEN SAVE RECEIVED USER INFO
    return this.http.post<IUSER>(`${apiUrlLan}/users/register`, data, {
      observe: 'response'
      // withCredentials: true,
      // responseType: 'json'
    });
  }

  logout() {
    return this.http.get(`${apiUrlLan}/users/logout`, {
      observe: 'response'
      // withCredentials: true,
      // responseType: 'json'
    })
  }

  changePassword(data: {currentPassword: string, newPassword: string, confirmPasswordL: string}) {

    return this.http.put(`${apiUrlLan}/users/change/password`,data, {
      observe:"response"
    })
  }

  changePersonalData(data: {firstName:string, lastName:string, phoneNumber:string}){
    return this.http.put<IUSER>(`${apiUrlLan}/users/change/data`,data,{
      observe:"response"
    })
  }

  //ADDRESS METHODS

  createNewOwnAddress(data:{apartment: string,
    block: string,
    city: string,
    detailsAboutAddress: string,
    entry: string,
    firstName: string,
    floor: string,
    lastName: string,
    municipality: string,
    neighborhood: string,
    phoneNumber: string,
    street: string,
    streetNumber: string,
    zip: string}) {
    console.log(data);
    console.log(data.street);
     return this.http.post<IADDRESS>(`${apiUrlLan}/users/new/address`,data,{
       observe:"response"
     })
  }

  editCurrentOwnAddress(data:{ apartment: string,
    block: string,
    city: string,
    detailsAboutAddress: string,
    entry: string,
    firstName: string,
    floor: string,
    lastName: string,
    municipality: string,
    neighborhood: string,
    phoneNumber: string,
    street: string,
    streetNumber: string,
    zip: string,
    id: number}) {
    return this.http.post<IADDRESS>(`${apiUrlLan}/users/edit/address`,data, {
      observe:"response"
    })
  }

  deleteAddressById(data:{id:number}) {
    return this.http.post(`${apiUrlLan}/users/delete/address?id=${data.id}`,{
      observe:"response"
    })
  }

  //ADDRESS METHODS

  getClothesBySpecificValue(data: {
    pageNo: number,
    pageSize: number,
    brand: string,
    size: string,
    discount: number,
    color: string,
    priceLow: number,
    priceHigh: number,
    sortBy: string,
    sex: string,
    type: string[],
    itemType: string
  }) {
    let pagination = "?";

    if (data.pageNo != -1) {
      pagination += pagination.length === 1 ? 'pageNo=' + data.pageNo : '&pageNo=' + data.pageNo;
    }
    if (data.pageSize != -1) {
      pagination += pagination.length === 1 ? 'pageSize=' + data.pageSize : '&pageSize=' + data.pageSize;
    }
    if (data.brand != '') {
      pagination += pagination.length === 1 ? 'brand=' + data.brand : '&brand=' + data.brand;
    }
    if (data.size != '') {
      pagination += pagination.length === 1 ? 'size=' + data.size : '&size=' + data.size;
    }
    if (data.discount != -1) {
      pagination += pagination.length === 1 ? 'discount=' + data.discount : '&discount=' + data.discount;
    }
    if (data.color != '') {
      pagination += pagination.length === 1 ? 'color=' + data.color : '&color=' + data.color;
    }
    if (data.priceLow != -1) {
      pagination += pagination.length === 1 ? 'priceLow=' + data.priceLow : '&priceLow=' + data.priceLow;
    }
    if (data.priceHigh != -1) {
      pagination += pagination.length === 1 ? 'priceHigh=' + data.priceHigh : '&priceHigh=' + data.priceHigh;
    }
    if (data.sortBy != '') {
      pagination += pagination.length === 1 ? 'sortBy=' + data.sortBy : '&sortBy=' + data.sortBy;
    }
    if (data.sex !== '') {
      pagination += pagination.length === 1 ? 'sex=' + data.sex : '&sex=' + data.sex;
    }

    if (data.type.length > 0) {
      data.type
        .forEach(value => {
          pagination += pagination.length === 1 ? 'type=' + value : '&type=' + value;
        });
    }

    if (data.itemType != '') {
      pagination += pagination.length === 1 ? 'itemType' + data.itemType : '&itemType=' + data.itemType;
    }

    return this.http.get<ICLOTHES>(`${apiUrlLan}/clothes/get/all${pagination.length > 1 ? pagination : ''}`, {
      withCredentials: true,
      responseType: "json"
    })
  }

  // CART
  addItemToCart(data: { id: number }) {

    return this.http.post<ICART>(`${apiUrlLan}/cart/add`, data, {
      observe: 'response'
    })
  }

  removeItemFromCart(data: { id: number }) {
    return this.http.delete(`${apiUrlLan}/cart/remove/${data.id}`, {
      observe: "response"
    });
  }

  populateClientCartBox() {

    return this.http.get<ICART[]>(`${apiUrlLan}/cart/get`);

  }

  // CART END

  // LIKES
  addItemToLike(data: { id: number }) {
    return this.http.post<ICART>(`${apiUrlLan}/like/like`, data.id, {
      observe: "response"
    })
  }

  removeItemFromLike(data: {id:number}) {
    return this.http.delete(`${apiUrlLan}/like/unlike/${data.id}`,{
      observe: "response"
    })
  }

  populateClientLikeBox() {

    return this.http.get<ICART[]>(`${apiUrlLan}/like/get`);

  }

  // LIKES END

  // ADMIN METHODS

  addNewCloth(data: {}) {
    console.log(data);
    return this.http.post(`${apiUrlLan}/admin/cloth/create`, data, {
      observe: "response"
      // withCredentials: true,
      // headers: {'Content-Type': 'multipart/form-data'}
      // responseType: "json"
      // responseType:""
    })
  };

  // ADMIN METHODS END

  getAllFieldsForClothes() {
    return this.http.get<ICLOTHSENUMS>(`${apiUrlLan}/fields`, {
      // withCredentials: true
    })
  }

  validateUserToken(): boolean {
    let isLogged = false;
    //  HERE I MUST CALL API FOR VALIDATE TOKEN THEN I MUST RETURN BOOLEAN IF THE USER LOGGED!
    // I MUST UPDATE IUSER for info
    this.http.get<IUSER>(`${apiUrlLan}/users/validate`, {
      observe: 'response'
      // withCredentials: true,
      // responseType: 'json'
    }).subscribe({
      next: value => {
        this.booleanService.setIsLoggedTrue();
        value.body?.roles.forEach(value1 => {
          if (value1.role === 'ADMINISTRATOR') {
            this.booleanService.setIsAdminTrue();
          } else {
            this.booleanService.setIsAdminFalse();
          }
        });
        if (value.body != null) {
          // VALIDATE DOESN'T SEND ADDRESSES , SO HERE IS THE BUG !
          // this.booleanService
          //   .user = value.body;
        }
      },
      error: err => {
        this.booleanService.setIsLoggedFalse();
        this.booleanService.setIsAdminFalse();
      }
    });
    return isLogged;
  }

  getClothById(id: number) {

    return this.http.get<ICLOTH>(`clothesId/${apiUrlLan}/clothes/get/${id}`);
  }


//  ADDRESSES DB

  getLocation(data:{location:string,speedy:string}) {
    return this.http.get<ICITY[]>(`${apiUrlLan}/users/location?${data.location.length > 0 ? 'location=' + `${data.location}` : 'speedy=' + `${data.speedy}` }`);
  }

  getAddressByCityId(cityId:number) {
    console.log(cityId)
    return this.http.get<IADDRESSSPEEDY[]>(`${apiUrlLan}/users/address?city=${cityId}`);
  }

  createOfficeSpeedyAddress(data: { cityId: number, speedyOfficeId: number, firstName: string , lastName: string, phoneNumber: string}) {
    return this.http.post<IUSERSPEEDYADDRESS>(`${apiUrlLan}/users/new/office/address`,data,{
      observe:"response"
    })
  }

//   createNewOwnAddress(data:{apartment: string,
//     block: string,
//     city: string,
//     detailsAboutAddress: string,
//     entry: string,
//     firstName: string,
//     floor: string,
//     lastName: string,
//     municipality: string,
//     neighborhood: string,
//     phoneNumber: string,
//     street: string,
//     streetNumber: string,
//     zip: string}) {
//     console.log(data);
//     console.log(data.street);
//      return this.http.post<IADDRESS>(`${apiUrlLan}/users/new/address`,data,{
//        observe:"response"
//      })
//   }


//  USER INFO [INTERFACE] POPULATE

  populateUserInfo() {
    return this.http.get<IUSER>(`${apiUrlLan}/users/info/data`,{
      observe:"response"
    })
  }

  populateUserAddresses() {
    return this.http.get<IUSER>(`${apiUrlLan}/users/info/addresses`,{
      observe:"response"
    })
  }

//  USER INFO [INTERFACE] POPULATE END



}
