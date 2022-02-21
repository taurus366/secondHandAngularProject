import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-clothes',
  templateUrl: './clothes.component.html',
  styleUrls: ['./clothes.component.css']
})
export class ClothesComponent implements OnInit {

  constructor(public activatedRoute: ActivatedRoute) {
  }

  womenNav:boolean = false;
  menNav:boolean = false;

  ngOnInit(): void {

    this.activatedRoute.params.subscribe(({who}) => {
      if (who === 'men'){
        this.falseAll();
        this.menNav = true;
      }else if (who === 'women'){
        this.falseAll();
        this.womenNav = true;
      }
    });

  }

  falseAll():void {
    this.womenNav = false;
    this.menNav = false;
  }

  getWomenNav():boolean {
    return this.womenNav;
  }
  getMenNav():boolean {
    return this.menNav;
  }


}
