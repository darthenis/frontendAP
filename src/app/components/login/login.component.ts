import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faUser, faKey, faEye, faEyeSlash, faSpinner} from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/services/auth.service';


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

  logged$ = this.authService.currentUser$

  passwordHide = true;

  loading = false;

  form : FormGroup;

  hidePassword() {

    this.passwordHide = !this.passwordHide;

  }

  iconPassword = this.passwordHide ? faEye : faEyeSlash;

  constructor(private fb : FormBuilder, private authService : AuthService, private router : Router) {


    this.form = this.fb.group({
      username : ['', Validators.required],
      password : ['', Validators.required]
    }); 

  }

  get Username() { return this.form.get('username'); }

  get Password() { return this.form.get('password'); }

  async onSubmit() {

    this.authService.login(this.form.value).subscribe( () => {

      this.router.navigate(['/user/', this.form.value.username]);

    })

  }

  ngOnInit(): void {

  

  }

}
