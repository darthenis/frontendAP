import { Component, OnInit } from '@angular/core';
import { faPenSquare, faTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-edit-buttons',
  templateUrl: './edit-buttons.component.html',
  styleUrls: ['./edit-buttons.component.css']
})
export class EditButtonsComponent implements OnInit {

  faPenSquare = faPenSquare;
  faTimes = faTimes;

  constructor() { }

  ngOnInit(): void {
  }

}
