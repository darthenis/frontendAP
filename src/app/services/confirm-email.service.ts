import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConfirmEmailService {

  url = environment.apiUrls.authUrl;

  constructor(private httpClient : HttpClient)  { }

  private confirmed : BehaviorSubject<any> = new BehaviorSubject<any>(null);
  
  currentConfirmed$ = this.confirmed.asObservable();

  confirm(){

    this.confirmed.next(true);

  }

  error(){

    this.confirmed.next(false);

  }

  confirmEmail(token : string): Observable<any>{

   return this.httpClient.get(this.url + "/confirm?token=" +token, {
    headers: new HttpHeaders({ 
      "Access-Control-Allow-Origin":"*"
    })
  });

  }

}
