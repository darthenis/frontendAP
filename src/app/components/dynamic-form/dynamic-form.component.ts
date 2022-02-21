import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { education } from '../education/type';
import { experience } from '../experience/type';
import { FormControls, FormData } from './interfaces';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { skill } from '../skills/type';
import { project } from '../projects/type';
import { AboutMe } from '../about-me/type';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.css'],

})
export class DynamicFormComponent implements OnInit {

  @Input() formData! : FormData
  @Input() editData! : education | experience | skill | project | AboutMe;
  @Input() formTitle : string = "";
  @Output() cancel = new EventEmitter()

  idUser : number = 1;

  fileName : string = 'vacio'

  

  faTimes = faTimes;

  public myForm : FormGroup = this.fb.group({});

  constructor(private fb : FormBuilder, private storageService : StorageService) { }

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


 onSubmit(event : FormDataEvent){

  event.preventDefault()
  console.log('Form values: ', this.myForm)

 }


 uploadImage(event : any, name : string, maxSize : number){

    const file = event.target.files[0] as File;

    this.myForm.get(name)?.patchValue(file)

    this.fileName = file.name

    console.log('fileName: ', this.fileName)
    
    console.log('file input: ', this.myForm.get(name)?.value.name)

    

    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {

        /*this.storageService.uploadImage( this.idUser + '_' + Date.now(), reader.result)
                .then(url => { 

                            if(url!==null){

                              console.log('url', url)

                          } else { 

                            console.log('error')
                          }
                        }
                      )*/

    }

 }

}
