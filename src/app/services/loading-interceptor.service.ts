import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, finalize, Observable } from 'rxjs';
import { LoadingService } from './loading.service';

@Injectable({
  providedIn: 'root'
})
export class LoadingInterceptorService implements HttpInterceptor{

  
  count = 0;

  constructor(private loadingService : LoadingService) { }
  
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if(req.method === 'GET'){
        this.loadingService.isLoadingGet.next(true);
        this.count++;
        return next.handle(req).pipe(
          finalize(() => {
          this.count--;
          if(this.count === 0) {
            this.loadingService.isLoadingGet.next(false);
          }
          })
          
        );
    } else if (req.method === 'POST' || req.method === 'PUT') {
      this.loadingService.isLoadingPost.next(true);
        this.count++;
        return next.handle(req).pipe(
          finalize(() => {
          this.count--;
          if(this.count === 0) {
            this.loadingService.isLoadingPost.next(false);
          }
          })
          
        );
    } return next.handle(req);

  }
}
