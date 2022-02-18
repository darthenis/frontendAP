import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-add-section',
  templateUrl: './add-section.component.html',
  styleUrls: ['./add-section.component.css']
})
export class AddSectionComponent implements OnInit {

  @Output() cancel = new EventEmitter();

  @Output() onAddSection = new EventEmitter<string>();

  faTimes = faTimes;

  addSection(section : string){

    this.onAddSection.emit(section);

    this.cancel.emit();

  }

  constructor() { }

  ngOnInit(): void {
  }

}
