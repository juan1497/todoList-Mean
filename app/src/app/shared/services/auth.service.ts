import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  urlBase="http://localhost:3000/user/"
  constructor(private http:HttpClient) { }

  register(data:any){
    return this.http.post(this.urlBase+"register",data)
  }
  login(data:any){
    return this.http.post(this.urlBase+"login",data)
  }
  logout(data:any){
    console.log("logout")
    return this.http.post(this.urlBase+"logout",data)
  }
}
