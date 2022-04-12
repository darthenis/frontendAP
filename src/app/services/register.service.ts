import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { registerData } from '../components/registration/registrationType';

import { map } from 'rxjs/operators';
import { AlertifyService } from './alertify.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private httpClient : HttpClient, private alertifyService : AlertifyService) { }

  url = 'http://localhost:8080/auth/register'

  register(formData : registerData): Observable<any>{

    console.log('enviado')

    return this.httpClient.post(this.url, formData).pipe( map( (response : any) => {

          if(response) this.alertifyService.sucess('Registrado correctamente')

          else console.log(response)

    }) )


  }

}
