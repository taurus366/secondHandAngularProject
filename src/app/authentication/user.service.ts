import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {IUSER} from "../shared/interfaces/IUSER";
import {BooleansService} from "../shared/booleans.service";

// for lan connection
const apiUrlLan = environment.apiURL;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  user: IUSER | undefined;


  // getIsLogged(): boolean {
  //   // HERE I MUST CALL API TO CHECK IF USER'S TOKEN ARE VALID
  //   return this.validateUserToken();
  // }

  constructor(private http: HttpClient, private booleanService: BooleansService) {
  }

  login(data: { email: string, password: string }) {
    // HERE I MUST CALL API FOR LOGIN THE USER THEN SAVE RECEIVED USER INFO
  return   this.http.post<IUSER>(`${apiUrlLan}/users/login`, data, {
      observe: 'response',
      withCredentials: true,
      responseType: 'json'
    })
    //   .subscribe({
    //   next: value => {
    //     // const jsonParsed = JSON.parse(<string>value.body || 'ERROR');
    //     // this.user = JSON.parse(jsonParsed);
    //     // console.log(this.user);
    //     console.log(value)
    //   },
    //   // IF EMAIL OR PASSWORD IS WRONG , I MUST RETURN SOME EXCEPTION TO DISPLAY
    //   error: err => {
    //     console.log(err)
    //   }
    // })
  };

  register(data: { email: string, password: string, confirmPassword: string, sex: string, firstName: string, lastName: string }) {
    //  HERE I MUST CALL API FOR REGISTER NEW USER THEN SAVE RECEIVED USER INFO
   return  this.http.post<IUSER>(`${apiUrlLan}/users/register`, data, {
      observe: 'response',
      withCredentials: true,
      responseType: 'json'
    });
  }

  logout() {
  return   this.http.get(`${apiUrlLan}/users/logout`, {
      observe: 'response',
      withCredentials: true,
      responseType: 'json'
    })
    //   .subscribe({
    //   next: value => {
    //     console.log("completed!")
    //   },
    //   error: err => {
    //   },
    //   complete: () => {
    //   }
    // })
  }


  validateUserToken(): boolean {
    let isLogged = false;
    //  HERE I MUST CALL API FOR VALIDATE TOKEN THEN I MUST RETURN BOOLEAN IF THE USER LOGGED!
    this.http.get<IUSER>(`${apiUrlLan}/users/validate`, {
      observe: 'response',
      withCredentials: true,
      responseType: 'json'
    }).subscribe({
      next: value => {
        this.booleanService.setIsLoggedTrue();
        value.body?.roles.forEach(value1 => {
          if (value1.role === 'ADMIN') {
            this.booleanService.setIsAdminTrue();
          } else {
            this.booleanService.setIsAdminFalse();
          }
        })
      },
      error: err => {
        this.booleanService.setIsLoggedFalse();
      }
    });
    return isLogged;
  }


}
