import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  public isLoadingPost : BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  public isLoadingGet : BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);


  setLoadingPost(value : boolean){

    this.isLoadingPost.next(value);

  }

  constructor() { }
}
