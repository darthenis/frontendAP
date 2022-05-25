import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import {faEnvelope, faBars } from '@fortawesome/free-solid-svg-icons';
import { UserDataService } from 'src/app/services/user-data.service';
import { Message } from '../messages/type';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']  
})
export class HeaderComponent implements OnInit {

  constructor(private router : Router, 
              private authService : AuthService,
              private userDataService : UserDataService) { }

  logged$ = this.authService.currentUser$;

  faEnvelope = faEnvelope;
  faBars = faBars;

  newMessages = 0;

  messages : Message[];

  openMessages = false;

  getScreenWidth: number;

  getScreenHeight: number;

  activeMenu : boolean | null = null;

  ngOnInit(): void {

    if(this.authService.isLogged()){

      this.userDataService.getMessages$().subscribe({

        next: (messages) => {
          
            this.messages = messages

            this.messages.filter(message => message.seen === false).forEach(message => this.newMessages++);
          
          },
  
        error: (err) => console.log(err)
  
      });
  
    
    }

    this.getScreenWidth = window.innerWidth;
    this.getScreenHeight = window.innerHeight;

  }

  login(){

      this.router.navigate(['/login']);

  }

  logout(){

    this.authService.logout();

  }

  @HostListener('window:resize', ['$event'])
  onWindowResize() {
    this.getScreenWidth = window.innerWidth;
    this.getScreenHeight = window.innerHeight;
  }

  isMobile(){

    if(this.getScreenWidth < 700){

      return true;

    }

    return false;


  }

}


