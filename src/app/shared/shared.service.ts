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
    SUCCESSFUL_LOGGED_MSG : 'Successfully registered! Logged automatically!',
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




}
