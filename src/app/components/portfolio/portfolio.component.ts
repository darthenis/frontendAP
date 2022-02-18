import { Component, OnInit } from '@angular/core';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { Subject } from 'rxjs/internal/Subject';
import { socialNetWorks } from '../interfaces/socialNetWorks';



@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent implements OnInit {

  subject = new Subject<socialNetWorks>()

  subAddSection = new Subject<string>();

  

  handleInfo(info: socialNetWorks) {
    this.subject.next(info);
  }

  handleAddSection(section: string) {

    this.subAddSection.next(section);
  
  }

  constructor() { 

  }

  ngOnInit(): void {

    this.subAddSection.next('portfolio');

  }

}
