import {Component, OnInit, Renderer2} from '@angular/core';


@Component({
  selector: 'app-alert-messages',
  templateUrl: './alert-messages.component.html',
  styleUrls: ['./alert-messages.component.css']
})
export class AlertMessagesComponent implements OnInit {

  constructor( private render2:Renderer2) { }

  ngOnInit(): void {
  }

  test():void {
    // this.render2.createElement()

  }

}
