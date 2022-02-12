import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { faPenSquare, faTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-edit-buttons',
  templateUrl: './edit-buttons.component.html',
  styleUrls: ['./edit-buttons.component.css']
})
export class EditButtonsComponent implements OnInit {

  @Output() editEvent = new EventEmitter<boolean>();
  @Output() deleteEvent = new EventEmitter();

  faPenSquare = faPenSquare;
  faTimes = faTimes;

  editState = false;

  edit(){

    this.editState = !this.editState

    this.editEvent.emit(this.editState)

  }

  delete(){

    this.deleteEvent.emit()

  }

  constructor() { }

  ngOnInit(): void {
  }

}
