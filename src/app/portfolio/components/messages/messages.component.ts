import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {faTimes, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { LoadingService } from 'src/app/services/loading.service';
import { UserDataService } from 'src/app/services/user-data.service';
import { Message } from './type';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  @Output() exit = new EventEmitter();
  @Output() seen = new EventEmitter();
  @Input() messages : Message[] = [] as Message[];;


  faTimes = faTimes;
  faSpinner = faSpinner;

  selectedMessage = 0;

  mouseOver : number | null= null;

  isLoading$ = this.loadingService.isLoadingGet;

  constructor(private userDataService : UserDataService,
              private loadingService : LoadingService) { }

  ngOnInit(): void {

    if(this.messages){

      if(this.messages[0]?.seen !== true){

        this.userDataService.setSeenMessage(this.messages[0].id).subscribe({

          next: (res) => {
    
            this.messages[0].seen = true;
      
            this.seen.emit();
      
          }
    
    
        })

    }


    }

  }

  setSeen(){

    if(this.messages[this.selectedMessage].seen === false){

        this.userDataService.setSeenMessage(this.messages[this.selectedMessage].id).subscribe({

          next: (res) => {

            this.messages[this.selectedMessage].seen = true;

            this.seen.emit();

          },

          error: (err) => console.log(err)

        })

    }

  }

  getDate(date : string){

    let result = date.replace(/^(\d{4})-(\d{2})-(\d{2})$/g,'$3/$2/$1');

    let atCreated = new Date(result)

    let yesterday = new Date();

    yesterday.setDate(yesterday.getDate() - 1)

    if(atCreated.getDate() === yesterday.getDate() ){

      return "ayer"

    }

    return atCreated.getDate() + " " + this.getMonth(atCreated.getMonth())

  }

  getMonth( month : number){

    switch(month){
        case 0:
            return "Ene";
        case 1:
            return "Feb";
        case 2:
            return "Mar";
        case 3:
            return "Abr";
        case 4:
            return "May";
        case 5:
            return "Jun";
        case 6:
            return "Jul";
        case 7:
            return "Ago";
        case 8:
            return "Sep";
        case 9:
            return "Oct";
        case 10:
            return "Nov";
        case 11:
            return "Dic";
        default:
            return "error";
    }

  }

  deleteMessage(id : number){

    this.userDataService.deleteMessage(id).subscribe({

      next: (res) => {

        this.messages = this.messages.filter(message => message.id !== id);

      },

      error: (err) => console.log(err)


    })


  }

}
