
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faCheckCircle, faTimesCircle, faCircle, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { AlertifyService } from 'src/app/services/alertify.service';
import { AuthService } from 'src/app/services/auth.service';
import { FocusInput } from './registrationType';

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
  done = false;

  focusInput : FocusInput = {
      username: false,
      password: false,
      passwordConfirm: false,
      name: false,
      lastname: false,
      email: false
  }


  checkPasswords: ValidatorFn = (group: AbstractControl): ValidationErrors | null => {

    let pass = group.get('password');
    let confirmPass = group.get('passwordConfirm');
    return pass?.value === confirmPass?.value ? null : { notSame : true }


  }

  invalidForm : boolean = false;
  
 
  form : FormGroup;

  strongRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])/


  constructor(private fb : FormBuilder, private authService : AuthService, private router: Router, private alertify : AlertifyService){ 

    this.form = this.fb.group({

      username : ['', [Validators.required, Validators.minLength(6), Validators.maxLength(10)]],
      password : ['',  [Validators.required, 
                        Validators.minLength(8), 
                        Validators.maxLength(16), 
                        Validators.pattern(this.strongRegex)
                        ]],
      passwordConfirm : ['',  Validators.required],
      name : ['', [Validators.required, Validators.minLength(3), Validators.maxLength(13)]],
      lastname : ['',  [Validators.required, Validators.minLength(3), Validators.maxLength(13)]],
      email : ['',  [Validators.required, Validators.email, Validators.maxLength(30)]],
      country : ['', [Validators.required, Validators.minLength(4), Validators.maxLength(15)]],
      state : ['', [Validators.required, Validators.minLength(4), Validators.maxLength(15)]],
      city : ['', [Validators.required, Validators.minLength(4), Validators.maxLength(15)]],

    } , {validators: this.checkPasswords });


  }

  ngOnInit(): void {
      

  }

  onSubmit() {

    if(!this.form.valid) {
      
      this.invalidForm = true;
      
    } else{

      this.loading = true;

      this.authService.signUp(this.form.value).subscribe({

        next : response => {  this.loading = false;

                              this.done = true;},

        error : error => this.loading = false
   
      
      });

    }

  }
  
  get Username() { return this.form.get('username'); }

  get Password() { return this.form.get('password'); }

  get PasswordConfirm() { return this.form.get('passwordConfirm'); }
  
  get Name() { return this.form.get('name'); }

  get Lastname() { return this.form.get('lastname'); }

  get Email() { return this.form.get('email'); }

  get Country() { return this.form.get('country'); }

  get State() { return this.form.get('state'); }

  get City() { return this.form.get('city'); }

  focus(input : string) {

    this.focusInput[input] = !this.focusInput[input];

  }

}
