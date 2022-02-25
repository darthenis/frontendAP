import { Injectable } from '@angular/core';

export interface user {
  id : number;
  username : string;
  token : string;
  state : boolean

}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userAuthenticated : user = {
                  id : 1,
                  username : 'darthenis',
                  token : 'dasdasdasdasdkasdwioqpudioajskldmnalsmd',
                  state : true
  }

  constructor() { }


isAuthenticated(){ 

  return this.userAuthenticated.state;

}

getUsername(){

  return this.userAuthenticated.username;


}

getIdUser(){

  return this.userAuthenticated.id;

}




}
