import { Component, OnInit, HostBinding, Input } from '@angular/core';
import { faGithubSquare, faLinkedin } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']  
})
export class HeaderComponent implements OnInit {
 
  faGitHubSquare = faGithubSquare;
  faLinkedin = faLinkedin;

  constructor() {

  }

  ngOnInit(): void {
  }

}


