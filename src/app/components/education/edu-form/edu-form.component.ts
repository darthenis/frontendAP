import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { education } from '../type';

@Component({
  selector: 'app-edu-form',
  templateUrl: './edu-form.component.html',
  styleUrls: ['./edu-form.component.css']
})
export class EduFormComponent implements OnInit {

  @Output() cancel = new EventEmitter()
  @Input()  editData! : education;

  eduForm : FormGroup;

  constructor(private fb : FormBuilder) { 

    this.eduForm = this.fb.group({

       
          title : ['', Validators.required],
          name : ['', Validators.required],
          initDate : ['', Validators.required],
          endDate : ['', Validators.required],
          career : ['', Validators.required],
          logourl : [''],

      
    })


  }

  ngOnInit(): void {
  }

  onSubmit(){}

}
