import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs/internal/Subject';
import { AuthService } from 'src/app/services/auth.service';
import { LoadingService } from 'src/app/services/loading.service';
import { UserDataService } from 'src/app/services/user-data.service';
import { AboutMe } from './components/about-me/type';



@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent implements OnInit {

  display = 'none';

  actualUserPage : string;

  subAddSection = new Subject<string>();

  aboutme : AboutMe;

  handleAddSection(section: string) {

    this.subAddSection.next(section);
  
  }

  constructor(private userDataService : UserDataService, 
              private router : Router, 
              private authService : AuthService, 
              private route : ActivatedRoute,
              private loadingService : LoadingService,
              private cdr : ChangeDetectorRef) { 


  }

  ngOnInit(): void {

        this.subAddSection.next('portfolio');

        

  }


  userExist() {

    this.display = 'block';

  }

}
