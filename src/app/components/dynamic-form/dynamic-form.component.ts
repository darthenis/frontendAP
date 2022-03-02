import { Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { education } from '../education/type';
import { experience } from '../experience/type';
import { FilesUpdate, FormControls, FormData } from './interfaces';
import { faTimes, faArrowUp, faCamera, faGrinTongueSquint } from '@fortawesome/free-solid-svg-icons';
import { skill } from '../skills/type';
import { project } from '../projects/type';
import { AboutMe } from '../about-me/type';
import { StorageService } from 'src/app/services/storage.service';
import { __core_private_testing_placeholder__ } from '@angular/core/testing';


@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.css'],

})
export class DynamicFormComponent implements OnInit {

  @Input() formData! : FormData
  @Input() editData! : education | experience | skill | project | AboutMe | any;
  @Input() formTitle : string = "";
  @Output() cancel = new EventEmitter()
  @Output() formSubmit = new EventEmitter<any>()
  @Output() formEditSubmit = new EventEmitter<any>()
  @ViewChild('fileInput')
  fileInput!: ElementRef;

  idUser : number = 1;

  fileName : File | null = null

  filesUpdate : FilesUpdate [] = []

  readingFile = false;

  

  faTimes = faTimes;
  faArrowUp = faArrowUp;
  faCamera = faCamera;

  public myForm : FormGroup = this.fb.group({});

  constructor(private fb : FormBuilder, private storageService : StorageService) { 


  

  }

 ngOnInit(): void {
     this.createForm(this.formData.controls)

     this.myForm.patchValue(this.editData)
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

    console.log('submit')

    this.formSubmit.emit(this.myForm.value)

  //TODO  : add loading effect with spinner

  }  //onSubmit


 checkImage(event : any, name : string, sizeMax : number){

    const file = event.target?.files[0] as File;

    if(file.size > sizeMax){

        return this.myForm.get(name)?.setErrors({'maxSize': true})

    }

      this.myForm.get(name)?.setValue(file) 
    
 }

/*async uploadImage(){

    let images = this.formData.controls.filter(e => e.type === 'file')

    for (let image of images){

        await this.readerImage(image.name)

    }

}


/*readerImage(name : string){

  const reader = new FileReader();

    return new Promise((resolve, reject) => {

      reader.readAsDataURL(this.myForm.get(name)?.value as File);
      reader.onloadend = () => {

        this.storageService.uploadImage(reader.result as string, this.editData ? this.editData[name] : '')
          .then( url => {

            resolve(this.myForm.get(name)?.setValue(url))

          })

      }

  })

}*/





 deleteFile(name : string){

  this.myForm.get(name)?.setValue('')

  this.fileInput.nativeElement.value = ''

  this.filesUpdate = this.filesUpdate.filter(e => e.name !== name)

 }

}
