import { Component, OnInit } from '@angular/core';
import {faPenSquare, faCamera } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-about-me',
  templateUrl: './about-me.component.html',
  styleUrls: ['./about-me.component.css']
})
export class AboutMeComponent implements OnInit {

  faPenSquare = faPenSquare;
  faCamera = faCamera;

  constructor() { }

  ngOnInit(): void {
  }

}
