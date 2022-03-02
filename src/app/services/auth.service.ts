import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AuthUser } from '../components/interfaces/authUser';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  url = 'http://localhost:8080/auth/login';

  private currentUser : BehaviorSubject<any> = new BehaviorSubject<any>(JSON.parse(sessionStorage.getItem('currentUser') || '{}'));
  
  currentUser$ = this.currentUser.asObservable();

  constructor(private httpClient : HttpClient) {}

  login(credentials : any) : Observable<any>{

      return this.httpClient.post(this.url, credentials).pipe(
        
          map( (response : any) => {
    
              let authUser : AuthUser = {...response, username : credentials.username };
        
              if(response){
        
                this.currentUser.next(authUser);
                sessionStorage.setItem('currentUser', JSON.stringify(authUser));
        
              }
    
          }),
     
      ) 

  }

  get currentUserValue(){

    return this.currentUser.value;

  }

  logout(){

    this.currentUser.next(JSON.parse('{}'));
    sessionStorage.removeItem('currentUser');


  }



}
