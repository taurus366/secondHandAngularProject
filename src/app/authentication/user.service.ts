import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {IUSER} from "../shared/interfaces/IUSER";

// for lan connection
const apiUrlLan = environment.apiURL;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  user: IUSER | undefined;

  getIsLogged(): boolean {
    // HERE I MUST CALL API TO CHECK IF USER'S TOKEN ARE VALID
    return this.validateUserToken();
  }

  constructor(private http: HttpClient) {
  }

  login(data: { email: string, password: string }): void {
    // HERE I MUST CALL API FOR LOGIN THE USER THEN SAVE RECEIVED USER INFO
    this.http.post(`${apiUrlLan}/users/login`, data, {
      observe: 'response',
      withCredentials: true,
      responseType: 'json'
    });
  }

  register(data: { email: string, password: string, confirmPassword: string, sex: string, firstName: string, lastName: string }): void {
    //  HERE I MUST CALL API FOR REGISTER NEW USER THEN SAVE RECEIVED USER INFO
    this.http.post<IUSER>(`${apiUrlLan}/users/register`, data, {
      observe: 'response',
      withCredentials: true,
      responseType: 'json'
    });
  }

  validateUserToken(): boolean {
    let isLogged = false;
    //  HERE I MUST CALL API FOR VALIDATE TOKEN THEN I MUST RETURN BOOLEAN IF THE USER LOGGED!
    this.http.get<IUSER>(`${apiUrlLan}/users/validate`, {
      observe: 'response',
      withCredentials: true,
      responseType: 'json'
    }).subscribe(value => {
      if (value.status === 401){
          isLogged = false;
      }else if (value.status === 200){
        isLogged = true;
        // HERE THE API MUST RETURN INFO!
        this.user = value.body!;
      }

    });
    return isLogged;
  }


}
