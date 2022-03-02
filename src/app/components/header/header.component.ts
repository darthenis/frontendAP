import { Component, OnInit, HostBinding, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { faGithubSquare, faLinkedin, faInstagramSquare, faFacebookSquare, faTwitterSquare } from '@fortawesome/free-brands-svg-icons';
import { Subject } from 'rxjs/internal/Subject';
import { AuthService } from 'src/app/services/auth.service';
import { socialNetWorks } from '../interfaces/socialNetWorks';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']  
})
export class HeaderComponent implements OnInit {

  @Input() subject!: Subject<socialNetWorks>;

  logged$ = this.authService.currentUser$

  socialNetworks! : socialNetWorks;
 
  faGitHubSquare = faGithubSquare;
  faLinkedin = faLinkedin;
  faFacebookSquare = faFacebookSquare;
  faTwitterSquare = faTwitterSquare;
  faInstagramSquare = faInstagramSquare;


  findIcon(name: string) {

    if(name === 'github') {
      return this.faGitHubSquare;
    }

    if(name === 'facebook') {
      return this.faFacebookSquare;
    }

    if(name === 'twitter') {
      return this.faTwitterSquare;
    }

    if(name === 'instagram') {
      return this.faInstagramSquare;
    }

    else {

      return this.faLinkedin;
      
    }



  }

  constructor(private router : Router, public authService : AuthService) { }



  ngOnInit(): void {

    this.subject.subscribe( (data : socialNetWorks) => {

        this.socialNetworks = data;

    });

  }

  login(){

      this.router.navigate(['/login']);

  }

  logout(){

    this.authService.logout();

  }




}


