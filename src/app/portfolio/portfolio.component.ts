import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';
import { AboutMe } from './components/about-me/type';



@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent implements OnInit {

  subAddSection = new Subject<string>();

  aboutme : AboutMe;

  handleAddSection(section: string) {

    this.subAddSection.next(section);
  
  }

  constructor() {}

  ngOnInit(): void {

        this.subAddSection.next('portfolio');

        

  }

}
