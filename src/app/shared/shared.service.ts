import {Injectable} from '@angular/core';
import {AlertMessagesGeneratorDirective} from "./alert-messages-generator.directive";

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor(private alertMsg: AlertMessagesGeneratorDirective) {
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
