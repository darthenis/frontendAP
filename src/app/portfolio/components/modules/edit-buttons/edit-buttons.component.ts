import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { faPenSquare, faTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-edit-buttons',
  templateUrl: './edit-buttons.component.html',
  styleUrls: ['./edit-buttons.component.css']
})
export class EditButtonsComponent implements OnInit {

  @Output() editEvent = new EventEmitter();
  @Output() deleteEvent = new EventEmitter();

  faPenSquare = faPenSquare;
  faTimes = faTimes;

 

  edit(){

    this.editEvent.emit();

  }

  delete(){

    this.deleteEvent.emit()

  }

  constructor() { }

  ngOnInit(): void {
  }

}
