import { Component, OnInit } from '@angular/core';
import {UserService} from "../user-service";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  links: string[] = ['/assets/images/discounts/man-lady.jpg','/assets/images/discounts/man.png','/assets/images/discounts/lady.jpg'];
  useLink : string = '';
  counter :number = this.getRandomNumber();


  constructor() { }

  ngOnInit(): void {
    this.useLink = this.links[this.getRandomNumber()];

    setInterval  (() => {
      this.counter++;
      if (this.counter >= this.links.length){
        this.counter = 0;
      }
      this.useLink = this.links[this.counter];
    },15000);

  }
  getRandomNumber() : number {
    return Math.floor(Math.random() * 3);
  }













}
