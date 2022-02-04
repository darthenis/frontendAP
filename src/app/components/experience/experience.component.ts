import { Component, OnInit } from '@angular/core';
import {faPenSquare, faTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.css']
})
export class ExperienceComponent implements OnInit {

  faPenSquare = faPenSquare;
  faTimes = faTimes;

  constructor() { }

  ngOnInit(): void {
  }

}
