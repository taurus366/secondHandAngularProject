import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-login-window',
  templateUrl: './login-window.component.html',
  styleUrls: ['./login-window.component.css']
})
export class LoginWindowComponent implements OnInit {

  @Output() isForgottenEventEmitter = new EventEmitter();


  constructor() { }

  ngOnInit(): void {
  }


  showForgottenPasswordWindow() {
    this.isForgottenEventEmitter.emit();
  }

  preventDefault(event : MouseEvent) : void {
    event.preventDefault();
  }

}
