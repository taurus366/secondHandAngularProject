import {Injectable} from '@angular/core';
import {AlertMessagesGeneratorDirective} from "./alert-messages-generator.directive";


@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor(private alertMsg: AlertMessagesGeneratorDirective) {
  }

  formMessages = {
    FORM_ERROR_MSG: 'Please correct the information where box in red',
    FORM_PASSWORDS_ARE_NOT_MATCH_MSG: '[ Passwords aren\'t matched ]',
    SUCCESSFUL_LOGGED_MSG: 'Successfully registered! Logged automatically!',
    FORM_SUCCESSFUL_ADDED_NEW_ITEM: 'Successfully added new cloth!'
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

}
