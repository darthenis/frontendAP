import { Component, OnInit } from '@angular/core';
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

  faTimes = faTimes;
  faSpinner = faSpinner;

  messages : Message[] = [];

  selectedMessage = 0;

  isLoading$ = this.loadingService.isLoadingGet;

  constructor(private userDataService : UserDataService,
              private loadingService : LoadingService) { }

  ngOnInit(): void {

    this.userDataService.getMessages$().subscribe({

      next: (messages) => this.messages = messages,

      error: (err) => console.log(err)

    });

  }

}
