import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { faUser, faKey, faEye, faEyeSlash, faSpinner} from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  faUser = faUser;
  faKey = faKey;
  faEye = faEye;
  faEyeSlash = faEyeSlash;
  faSpinner = faSpinner;

  passwordHide = true;

  loading = false;

  form : FormGroup;

  hidePassword() {

    this.passwordHide = !this.passwordHide;

  }

  iconPassword = this.passwordHide ? faEye : faEyeSlash;

  constructor(private fb : FormBuilder) {


    this.form = this.fb.group({
      username : ['', Validators.required],
      password : ['', Validators.required]
    }); 

  }

  get Username() { return this.form.get('username'); }

  get Password() { return this.form.get('password'); }

  onSubmit() {

      this.loading = true;

      setTimeout(() => { 

        this.loading = false
        console.log(this.form.value); 
      } , 3000);
  
    
  }

  ngOnInit(): void {
  }

}
