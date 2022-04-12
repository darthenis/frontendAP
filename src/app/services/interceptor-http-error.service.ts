import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { AlertifyService } from './alertify.service';

@Injectable({
  providedIn: 'root'
})
export class InterceptorHttpErrorService implements HttpInterceptor{

  constructor(private alertifyService : AlertifyService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((res: HttpErrorResponse) => {

        console.log(res)

        return throwError(() => {

          if (res.error instanceof ErrorEvent) {
            // A client-side or network error occurred. Handle it accordingly.
            console.error('An error occurred:', res.error.message);
          }else if (res.error.path === '/auth/login'){

              console.error('login error')
              this.alertifyService.error(res.error.message)

          } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            console.error(
              `Backend returned code ${res.status === 401}, ` + //return true
              `body was: ${res.error.message}`);
          }
        })

      })
    )
  }



}
