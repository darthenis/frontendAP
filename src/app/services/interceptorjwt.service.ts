import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class InterceptorJwtService implements HttpInterceptor{

  constructor(private authService : AuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    let token = this.authService.currentUserValue.token;

    if(token){

      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });

    }

    return next.handle(req);

  }
}
