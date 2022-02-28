import {Component, OnInit, Renderer2} from '@angular/core';
import {AlertMessagesGeneratorDirective} from "../shared/alert-messages-generator.directive";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  links: string[] = ['/assets/images/discounts/man-lady.jpg','/assets/images/discounts/man.png','/assets/images/discounts/lady.jpg'];
  useLink : string = '';
  counter :number = this.getRandomNumber();


  constructor(private alertMsg: AlertMessagesGeneratorDirective) { }

  ngOnInit(): void {
    this.useLink = this.links[this.getRandomNumber()];

    setInterval  (() => {
      this.counter++;
      if (this.counter >= this.links.length){
        this.counter = 0;
      }
      this.useLink = this.links[this.counter];
    },15000);


  this.alertMsg.error("test");
  }
  getRandomNumber() : number {
    return Math.floor(Math.random() * 3);
  }
















}
