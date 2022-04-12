import { registerLocaleData } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { faCheckCircle, faTimesCircle, faCircle, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { RegisterService } from 'src/app/services/register.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  faCheckCircle = faCheckCircle;
  faTimesCircle = faTimesCircle;
  faCircle = faCircle;
  faSpinner = faSpinner;


  loading = false;




  checkPasswords: ValidatorFn = (group: AbstractControl): ValidationErrors | null => {

    let pass = group.get('password');
    let confirmPass = group.get('passwordConfirm');
    return pass?.value === confirmPass?.value ? null : { notSame : true }


  }

  invalidForm : boolean = false;
  


  onSubmit() {

    if(!this.form.valid) {
      
      this.invalidForm = true;
      
    } else{

      //this.loading = true;

      this.registerService.register(this.form.value)

    }

  }

 
  form : FormGroup;


  constructor(private fb : FormBuilder, private registerService : RegisterService) { 

    this.form = this.fb.group({

      username : ['', [Validators.required, Validators.minLength(6), Validators.maxLength(10)]],
      password : ['',  [Validators.required, Validators.minLength(8), Validators.maxLength(12)]],
      passwordConfirm : ['',  Validators.required],
      name : ['', [Validators.required, Validators.minLength(3)]],
      lastname : ['',  [Validators.required, Validators.minLength(3)]],
      email : ['',  [Validators.required, Validators.email]]

    } , {validators: this.checkPasswords });


  }

  ngOnInit(): void {
      

  }
  
  get Username() { return this.form.get('username'); }

  get Password() { return this.form.get('password'); }

  get PasswordConfirm() { return this.form.get('passwordConfirm'); }
  
  get Name() { return this.form.get('name'); }

  get Lastname() { return this.form.get('lastname'); }

  get Email() { return this.form.get('email'); }

  

}
