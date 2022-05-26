import { Injectable } from '@angular/core';
import * as alertify from 'alertifyjs';


@Injectable({
  providedIn: 'any'
})
export class AlertifyService {


  constructor() { }



  success(message : string){
    alertify.set('notifier','position', 'bottom-right');
    alertify.sucess(message);

  }

  warning(message: string){
    alertify.set('notifier','position', 'bottom-right');
    alertify.warning(message);

  }

  error(message : string){
    alertify.set('notifier','position', 'top-center');
    alertify.error(message);

  }


}
