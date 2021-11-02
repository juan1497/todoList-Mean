import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

  constructor() { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token');
    const email=localStorage.getItem('email')
    let peticion=req;
    
    if(token||req.url=="http://localhost:3000/tarea/tareas"||req.url=="http://localhost:3000/tarea/add-tarea"){
      console.log("entro")
      peticion = req.clone({
        setHeaders: {
          authorization: `Bearer ${ token }`,
          email: `${email}`
        }
      });
    }
   
    // if (token) {
    //   peticion = req.clone({
    //     setHeaders: {
    //       authorization: `Bearer ${ token }`,
    //       email: `${email}`
    //     }
    //   });
    // }
  
    return next.handle(peticion);
  }
}
