import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {faAngleDown, faAngleUp} from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-arrow-resume',
  templateUrl: './arrow-resume.component.html',
  styleUrls: ['./arrow-resume.component.css']
})
export class ArrowResumeComponent implements OnInit {
  @Output() eventResume = new EventEmitter<boolean>();

  resume = true;

  faAngleDown = faAngleDown;
  faAngleUp = faAngleUp;

  resumeChange(){

    this.resume = !this.resume

    this.eventResume.emit(this.resume);

  }

  constructor() { }

  ngOnInit(): void {

  }

}
