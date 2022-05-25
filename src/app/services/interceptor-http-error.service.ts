import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { InvokeFunctionExpr } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';
import { AlertifyService } from './alertify.service';
import { AuthService } from './auth.service';
import { ConfirmEmailService } from './confirm-email.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InterceptorHttpErrorService implements HttpInterceptor{

  authUrl = environment.apiUrls.authUrl;

  constructor(private alertifyService : AlertifyService, 
              private confirmEmailService : ConfirmEmailService, 
              private authService : AuthService,
              private router : Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((res: HttpErrorResponse) => {

        return throwError(() => {

          console.log(res)

          if (res.error instanceof ErrorEvent) {
            // A client-side or network error occurred. Handle it accordingly.
            console.error('An error occurred:', res.error.message);
          }else if(res.error.message.includes("Token has expired")){
            
            this.alertifyService.error("Your session has expired. Please login again.");
            
          } else if(res.error.message?.includes("Token must be provided")){

            this.authService.logout();

          } else if(res.url === this.authUrl + '/login'){

            this.alertifyService.error('Invalid username or password');

          } else if(res.error.path === '/auth/confirm'){

            this.confirmEmailService.error();

        } else if(res.error.message?.includes("Temporary System Problem")){

            this.alertifyService.error("Problemas temporales en el sistema. Por favor intente más tarde.");

        } else {

            this.alertifyService.error(res.error.message);

        }

      })
     } )
  
    )

  }
}
