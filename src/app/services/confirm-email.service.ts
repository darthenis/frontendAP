import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConfirmEmailService {

  constructor(private httpClient : HttpClient)  { }

  private confirmed : BehaviorSubject<any> = new BehaviorSubject<any>(null);
  
  currentConfirmed$ = this.confirmed.asObservable();

  confirm(){

    this.confirmed.next(true);

  }

  error(){

    this.confirmed.next(false);

  }

  confirmEmail(token : string): void {

    this.httpClient.get(`http://localhost:8080/auth/confirm?token=${token}`).subscribe({ 
                  
                  next: () => this.confirm(), 
                  error: () => this.error()
                
                
                }); 

  }

}
