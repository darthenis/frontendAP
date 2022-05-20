import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { AuthService } from './auth.service';
import jwtDecode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class InterceptorJwtService implements HttpInterceptor{

  constructor(private authService : AuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    let token = this.authService.currentUserValue.token;

    if(this.isExpired(token)){

      this.authService.logout();

      return next.handle(req);

    }

    if(token){

      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });

    }

    return next.handle(req);

  }

  isExpired(token : string){

    if(token){

      let payload = this.getDecodedAccessToken(token);

      let now = new Date().getTime() / 1000;

      if(payload.exp < now){
        return true;
      }

    }

    return false;

  }

  getDecodedAccessToken(token: string): any {
    try {
      return jwtDecode(token);
    } catch(Error) {
      return null;
    }
  }


}
