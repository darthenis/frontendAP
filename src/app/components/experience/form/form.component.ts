import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {experience} from '../type'

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  @Output() cancel = new EventEmitter();
  @Input()  editData! : experience;



  form : FormGroup;

  constructor(private fb : FormBuilder) {


    this.form = this.fb.group({

      title : ['', Validators.required],
      name : ['', Validators.required],
      initDate : ['', Validators.required],
      endDate : ['', Validators.required],
      job : ['', Validators.required],
      info : ['']

    })

   }

  ngOnInit(): void {

    this.form.patchValue(this.editData);

  }

  onSubmit(){

    console.log('editData:', this.editData)


  }

}
