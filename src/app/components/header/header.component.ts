import { Component, OnInit, HostBinding, Input } from '@angular/core';
import { faGithubSquare, faLinkedin, faInstagramSquare, faFacebookSquare, faTwitterSquare } from '@fortawesome/free-brands-svg-icons';
import { Subject } from 'rxjs/internal/Subject';
import { socialNetWorks } from '../interfaces/socialNetWorks';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']  
})
export class HeaderComponent implements OnInit {

  @Input() subject!: Subject<socialNetWorks>;

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

  constructor() {

  }

  ngOnInit(): void {

    this.subject.subscribe( (data : socialNetWorks) => {

        this.socialNetworks = data;

    });




  }




}


