import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-order-nav',
  templateUrl: './order-nav.component.html',
  styleUrls: ['./order-nav.component.css']
})
export class OrderNavComponent implements OnInit {

  @Output() EventEmitterForSwitchWindows = new EventEmitter<String>();

  constructor() { }

  ngOnInit(): void {
  }

  switchWindow(type: string): void {
    this.EventEmitterForSwitchWindows.emit(type);
  }

}
