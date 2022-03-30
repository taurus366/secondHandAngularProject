import {Injectable} from '@angular/core';
import {AlertMessagesGeneratorDirective} from "./alert-messages-generator.directive";
import {BooleansService} from "./booleans.service";


@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor(private alertMsg: AlertMessagesGeneratorDirective,private booleanService:BooleansService) {
  }

  formMessages = {
    FORM: {
      FORM_ERROR_MSG: 'Please correct the information where box in red',
      FORM_PASSWORDS_ARE_NOT_MATCH_MSG: '[ Passwords aren\'t matched ]',
      FORM_SUCCESSFUL_ADDED_NEW_ITEM: 'Successfully added new cloth!'
    },
    LOG: {
      SUCCESSFUL_LOGGED_MSG: 'Successfully registered! Logged automatically!'
    },
    CART: {
      CART_DELETE_ERROR: 'Something has gone wrong, please try it again or contact with the customer',
      CART_ADD_ERROR: 'Something has gone wrong, please try it again or contact with the customer',
      CART_ADD_SUCCESSFUL:'Successful added item to Cart.',
      CART_DELETE_SUCCESSFUL:'Successful deleted item from Cart.',
      CART_ALREADY_ADDED: 'The item which you are trying to add is exists in your cart!'
    },
    LIKE: {
      LIKE_DELETE_ERROR: 'Something has gone wrong, please try it again or contact with the customer',
      LIKE_ADD_ERROR: 'Something has gone wrong, please try it again or contact with the customer',
      LIKE_ADD_SUCCESSFUL: 'Successful liked item.',
      LIKE_DELETE_SUCCESSFUL: 'Successful unliked item.',
      LIKE_ALREADY_ADDED: 'The item which you are trying to like is already liked by you!'
    }


  }


  ngOnInit(): void {
  }

  preventDefault = (event: MouseEvent): void => {
    event.preventDefault();
  }

  showAlertMsg = {
    error: (msg: string) => {
      this.alertMsg.error(msg);
    },
    success: (msg: string) => {
      this.alertMsg.success(msg);
    },
    info: (msg: string) => {
      this.alertMsg.info(msg);
    }
  }

  scrollTop(): void {
    window.scroll(0, 0);
  }

  callDocumentQuerySelectorByString(selectorItems: string[]) {
    let itemsArray: Element[] = [];

    selectorItems
      .forEach(value => {

       if (value.length > 0){
         document.querySelectorAll(value)
           .forEach(value1 => {
             itemsArray!.push(value1);
           });
       }

      })


    return this.readFilterValues(itemsArray)!;
  }

  cleanCheckedBoxes(element: string){

    let elements : any[] = [];
    document
      .querySelectorAll(element)
      .forEach(value => {
        elements.push(value);
      })

    elements
      .forEach(value => {
        if (value.checked){
          value.checked = false;

        }
      })

  }

  readFilterValues(elements: any[]) {
    let arrayOfValues: any = {};
    let type: string[] = [];
    // console.log(elements)
    elements
      .forEach(value => {
        let key = '';

        // console.log(value.id)

        switch (value.id) {

          case 'clothes-colors':
            key = 'color';
            break;
          case 'clothes-discounts':
            key = 'discount';
            break;
          case 'clothes-size':
            key = 'size';
            break;
          case 'clothes-brand':
            key = 'brand';
            break;
        }

        if (value.id === 'women-cloth-nav' && value.checked){
          type.push(value.name);
        }
        if (value.id === 'men-cloth-nav' && value.checked){
          type.push(value.name);
        }
        if (value.id === 'boys-cloth-nav' && value.checked){
          type.push(value.name);
        }
        if (value.id === 'girls-cloth-nav' && value.checked){
          type.push(value.name);
        }


        if (value.value.length > 0) {
          arrayOfValues[key] = value.value;
        }
      });
    if (type.length > 0){
      arrayOfValues['type']= type;
    }

    return arrayOfValues;
  }

  capitalizeFirstLetter(word : string):string {
    let capitalizedString :string = "";
    capitalizedString += word.charAt(0);
    capitalizedString += word.slice(1,).toLowerCase();
    return capitalizedString;
  }

  calculatePercentOfDiscount(oldPrice: any, newPrice: any): number {

    return Math.round(((parseFloat(oldPrice) - parseFloat(newPrice)) / parseFloat(oldPrice)) * 100);
  }

  checkItemIsAdded(itemId?: number): boolean {
    let isAdded: boolean = false;
    this.booleanService.getUserCartBoxItems()
      ?.forEach(value => {
        if (value.id === itemId) {
          isAdded = true;
        }
      })

    return isAdded;
  }

}
