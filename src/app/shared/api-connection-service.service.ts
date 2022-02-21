import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {IUSER} from "./interfaces/IUSER";


// for lan connection
const apiUrl = environment.apiURL;

@Injectable({
  providedIn: 'root'
})
export class ApiConnectionServiceService {

  constructor(private http: HttpClient) { }

  test(data: {email:string; password:string;}){
    // const header = new HttpHeaders();
    // header.set("Cookie","JSESSIONID=9EF5DA77CA4F2A270CB312554B381E7B");
    // header.set("Content-Type","application/json2");

    return  this.http.post(`${apiUrl}/users/test`,data,{withCredentials:true,observe:'response',responseType:'json'})
  }
  registerNewUser(data: {email:string; password:string;confirmPassword:string;firstName:string;lastName:string;sex:string}) {

    const header = new HttpHeaders();
    header.set('X-XSRF-TOKEN','XSRF-TOKEN=1bc6029b-8430-4ab8-8e91-010dcce83e53');
    // return   this.http.post<IUSER>(`${apiUrl}/users/register`,data);
   return   this.http.post(`${apiUrl}/login`,{email:"ali@abv.bg",password:"12345678"},{observe: 'response',withCredentials:true,responseType:'json',headers:header});
     // return this.http.post(`${apiUrl}/users/test`,data);
      // return  this.http.post(`${apiUrl}/users/login`,{"email":"ali@abv.bg","password":"12345678"})
  }

  logout(){
    return this.http.post(`${apiUrl}/logout`,null,{observe: 'response',withCredentials:true,responseType:'json'})
  }


}
