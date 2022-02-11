import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { faCheckCircle, faTimesCircle, faCircle, faSpinner } from '@fortawesome/free-solid-svg-icons';

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

  public profileGroup : any;

  invalidForm : boolean = false;
  


  onSubmit() {

    if(!this.profileGroup.valid) {
      
      this.invalidForm = true;
      
    } else{

      this.loading = true;

      setTimeout(() => { this.loading = false } , 3000);
    }

  }

 



  constructor() { }

  ngOnInit(): void {

    this.profileGroup = new FormGroup({

      username : new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(10)]),
      password : new FormControl('',  [Validators.required, Validators.minLength(8)]),
      passwordConfirm : new FormControl('',  Validators.required),
      name : new FormControl('', [Validators.required, Validators.minLength(3)]),
      lastname : new FormControl('',  [Validators.required, Validators.minLength(3)]),
      email : new FormControl('',  [Validators.required, Validators.email])

    } , {validators: this.checkPasswords });

  }
  
  get username() { return this.profileGroup.get('username'); }

  get password() { return this.profileGroup.get('password'); }

  get passwordConfirm() { return this.profileGroup.get('passwordConfirm'); }
  
  get name() { return this.profileGroup.get('name'); }

  get lastname() { return this.profileGroup.get('lastname'); }

  get email() { return this.profileGroup.get('email'); }

}
