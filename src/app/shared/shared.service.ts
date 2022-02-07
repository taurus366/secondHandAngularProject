import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor() { }

    preventDefault = (event : MouseEvent): void => {
    event.preventDefault();
  }
}
