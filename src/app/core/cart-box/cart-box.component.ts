import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-cart-box',
  templateUrl: './cart-box.component.html',
  styleUrls: ['./cart-box.component.css']
})
export class CartBoxComponent implements OnInit {

  @Input() cartBoxItemCounter!:number;

  constructor() { }

  ngOnInit(): void {
  }

}
