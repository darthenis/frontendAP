import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthUser } from '../components/interfaces/authUser';
import { AlertifyService } from './alertify.service';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  url = environment.apiUrls.authUrl;

  private currentUser : BehaviorSubject<any> = new BehaviorSubject<any>(JSON.parse(sessionStorage.getItem('currentUser') || '{}'));

  private recoveryCode : BehaviorSubject<any> = new BehaviorSubject<any>({});

  currentRecoveryCode = this.recoveryCode.asObservable();
  
  currentUser$ = this.currentUser.asObservable();

  constructor(private httpClient : HttpClient, private alertifyService : AlertifyService) {}

  isLogged(){

    return this.currentUser.value.username ? true : false;

  }

  signUp(formData : FormData) : Observable<any>{

    return this.httpClient.post(this.url+'/register', formData).pipe(
      
        map( (response : any) => {
  
            if(response){

              return response;
            }
  
        }),
   
    ) 

  }

  login(credentials : any) : Observable<any>{

      return this.httpClient.post(this.url+'/login', credentials).pipe(
        
          map( (response : any) => {
    
              if(response){

                let authUser : AuthUser = {...response, username : credentials.username };
        
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

  getCode(email : string) : Observable<any>{

    return this.httpClient.post(this.url+'/recovery', email);

  }

  checkCode(code : number) : Observable<any>{


    return this.httpClient.post(this.url+'/checkcode', code).pipe(


      map( (response : any) => {

        this.recoveryCode.next(code);

      })
    )


  }

  changePass(pass : string) : Observable<any>{

    console.log('recoveryCode', this.recoveryCode.value)

    return this.httpClient.post(this.url+'/newpassword', {password : pass, code : this.recoveryCode.value});

  }



}
