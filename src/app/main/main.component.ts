import {Component, OnInit, Renderer2} from '@angular/core';
import {AlertMessagesGeneratorDirective} from "../shared/alert-messages-generator.directive";
import {SharedService} from "../shared/shared.service";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  links: string[] = ['/assets/images/discounts/man-lady.jpg', '/assets/images/discounts/man.png', '/assets/images/discounts/lady.jpg'];
  useLink: string = '';
  counter: number = this.getRandomNumber();


  constructor(private alertMsg: SharedService) {
  }

  ngOnInit(): void {
    this.useLink = this.links[this.getRandomNumber()];

    setInterval(() => {
      this.counter++;
      if (this.counter >= this.links.length) {
        this.counter = 0;
      }
      this.useLink = this.links[this.counter];
    }, 15000);

    // setInterval(() => {
    //   this.alertMsg.showAlertMsg.error("error");
    //   this.alertMsg.showAlertMsg.success("success");
    //   this.alertMsg.showAlertMsg.info("info");
    // }, 7000);

    // setInterval(()=>{
    //   this.alertMsg.showAlertMsg.success("success");
    // },5000);


    // setInterval(()=>{
    //   this.alertMsg.showAlertMsg.info("info");
    // },10000);


  }

  getRandomNumber(): number {
    return Math.floor(Math.random() * 3);
  }


}
