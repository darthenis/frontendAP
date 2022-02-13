import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { education } from '../education/type';
import { FormControls, FormData } from './interfaces';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.css'],

})
export class DynamicFormComponent implements OnInit {

  @Input() formData! : FormData
  @Input() editData! : education;
  @Output() cancel = new EventEmitter()

  public myForm : FormGroup = this.fb.group({});

  constructor(private fb : FormBuilder) { }

  event(){

    console.log(this.formData)

  }

 ngOnInit(): void {
     this.createForm(this.formData.controls)
 }


 createForm(controls : FormControls[]){

  for(let control of controls){

    const validatorosToAdd = [];

    for(const [key, value] of Object.entries(control.validators)){

      switch(key){
        case 'required':
          if(value){
            validatorosToAdd.push(Validators.required);
          }
          break;
        case 'minLength':
          validatorosToAdd.push(Validators.minLength(value))
          break;
        case 'maxLength':
          validatorosToAdd.push(Validators.maxLength(value));
          break;
          default:
          break;

      }


    }

    this.myForm.addControl(control.name, this.fb.control(control.value, validatorosToAdd))

  }

 }


 onSubmit(){

  console.log('Form valid: ', this.myForm.valid)
  console.log('Form values: ', this.myForm.value)

 }

}
