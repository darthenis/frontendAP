import { Injectable } from '@angular/core';
import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

firebase.initializeApp(environment.firebaseConfig)

@Injectable({
  providedIn: 'root'
})
export class StorageService { 

  storageRef = firebase.app().storage().ref();

  constructor(private authService : AuthService) { }


  async uploadImage(base64 : string, urlRef? : string){

    let id = this.authService.getIdUser();

    let name = id + "_" + Date.now();

    try{
        let imageRef = await this.storageRef.child("users/"+id+"/"+name).putString(base64, 'data_url');
        return await imageRef.ref.getDownloadURL();
    } catch(error){
        console.log('error: ', error);
        return '';
    }

  }

  async deleteImage(url:string){
      
        try{
            const imageRef = this.storageRef.child(url);
            await imageRef.delete();
            return true;
        } catch(error){
            console.log(error);
            return false;
        }
  
    }


}
