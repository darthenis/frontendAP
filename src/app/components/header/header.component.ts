import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import {faEnvelope} from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']  
})
export class HeaderComponent implements OnInit {

  constructor(private router : Router, public authService : AuthService) { }

  logged$ = this.authService.currentUser$;

  faEnvelope = faEnvelope;

  newMessages = 0;

  ngOnInit(): void {

  }


  openMessages(){

    alert("Messages");


  }

  login(){

      this.router.navigate(['/login']);

  }

  logout(){

    this.authService.logout();

  }




}


