import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import '../../../assets/slick/slickCustom.js';


declare const getSlick:any;

@Component({
  selector: 'app-new-charge-clothes',
  templateUrl: './new-charge-clothes.component.html',
  styleUrls: ['./new-charge-clothes.component.css']
})
export class NewChargeClothesComponent implements OnInit {

  constructor() {

  }

  ngOnInit(): void {

    if (document.readyState === 'complete') {
      getSlick()
    }

    if (document.readyState === 'interactive'){
      getSlick()
    }

  }




}
