import { Injectable } from '@angular/core';
import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';
import { environment } from 'src/environments/environment';

firebase.initializeApp(environment.firebaseConfig)

@Injectable({
  providedIn: 'root'
})
export class StorageService { 

  storageRef = firebase.app().storage().ref();

  constructor() { }


  async uploadImage(image:string, imgBase64:any){

      try{
          const imageRef = this.storageRef.child(`users/images/${image}`);
          await imageRef.putString(imgBase64, 'data_url');
          return imageRef.getDownloadURL();
      } catch(error){
          console.log(error);
          return null;
      }



  }


}
