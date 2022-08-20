import { Component, OnInit } from '@angular/core';
import {ICLOTH} from "../../shared/interfaces/ICLOTH";
import {BooleansService} from "../../shared/booleans.service";
import {SharedService} from "../../shared/shared.service";

@Component({
  selector: 'app-order-bag',
  templateUrl: './order-bag.component.html',
  styleUrls: ['./order-bag.component.css']
})
export class OrderBagComponent implements OnInit {

  constructor(private booleanService: BooleansService,public sharedService:SharedService) { }

  cartBoxItems: ICLOTH[] | undefined;

  ngOnInit(): void {
    this.cartBoxItems = this.booleanService.cartBoxItems;
  }

  getTotalCartPrice(): number {

    let totalPrice: number = 0;

    this.cartBoxItems
      ?.forEach(value => {
        totalPrice = totalPrice + value.newPrice;
      })

    return totalPrice;
  }

  getTotalDiscountPrice(): number {
    let discountPrice: number = 0;

    this.cartBoxItems
      ?.forEach(value => {
        discountPrice = discountPrice + (value.startPrice - value.newPrice);
      })

    return discountPrice;
  }

  getTotalPriceWithoutDiscount(): number {
    let total:number = 0;

    this.cartBoxItems
      ?.forEach(value => {
       total = total + value.startPrice;
      })

    return total;
  }

}
