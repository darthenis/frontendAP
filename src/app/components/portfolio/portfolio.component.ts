import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs/internal/Subject';
import { AuthService } from 'src/app/services/auth.service';
import { UserDataService } from 'src/app/services/user-data.service';
import { AboutMe } from '../about-me/type';
import { socialNetWorks } from '../interfaces/socialNetWorks';



@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent implements OnInit {

  subject = new Subject<socialNetWorks>()

  display = 'none';

  authUser = false;

  subAddSection = new Subject<string>();

  authenticatedUser : boolean = false

  aboutme! : AboutMe;

  handleInfo(info: socialNetWorks) {
    this.subject.next(info);
  }

  handleAddSection(section: string) {

    this.subAddSection.next(section);
  
  }

  constructor(private userDataService : UserDataService, private router : Router, private authService : AuthService, private route : ActivatedRoute) { }


  ngOnInit(): void {

      this.route.params.subscribe( (param : any) => {

        const {username} = param;

        this.authUser = this.authService.isAuthenticated() && username === this.authService.getUsername();

        })

        this.subAddSection.next('portfolio');

  }


  userExist() {

    this.display = 'block';

  }

}
