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

  readerImage(file : File){

    const reader = new FileReader();

    return new Promise((resolve, reject) => {

      reader.readAsDataURL(file);
      reader.onloadend = () => {

            resolve(reader.result as string)

          }

      })

  }


  async uploadImage(file : File, urlRef? : string){

    let base64 : any;

    let id = this.authService.currentUserValue.id;

    let name = id + "_" + Date.now();

    await this.readerImage(file).then((result) => {

      base64 = result;

    })

   
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
