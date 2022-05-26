import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faUser, faKey, faEye, faEyeSlash, faSpinner} from '@fortawesome/free-solid-svg-icons';
import { AlertifyService } from 'src/app/services/alertify.service';
import { AuthService } from 'src/app/services/auth.service';
import { LoadingService } from 'src/app/services/loading.service';


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

  loading$ = this.loadingService.isLoadingPost;

  form : FormGroup;

  hidePassword() {

    this.passwordHide = !this.passwordHide;

  }

  iconPassword = this.passwordHide ? faEye : faEyeSlash;

  constructor(private fb : FormBuilder, 
              private authService : AuthService, 
              private router : Router,
              private alertifyService : AlertifyService,
              public loadingService : LoadingService) {


    this.form = this.fb.group({
      username : ['', Validators.required],
      password : ['', Validators.required]
    }); 

  }

  get Username() { return this.form.get('username'); }

  get Password() { return this.form.get('password'); }



  async onSubmit() {

      if(this.form.value.username === '' || this.form.value.password === '') {

        this.alertifyService.error('Por favor ingrese un usuario y su contraseña');

        return;

      }

      this.authService.login(this.form.value).subscribe({
  
        next: resolve => this.router.navigate(['/user/', this.form.value.username]),
  
        error: error => console.log(error)
  
      })

  }

  ngOnInit(): void {

    this.logged$.subscribe(resolve => {

      if(resolve.username) {

        this.router.navigate(['/user/', resolve.username]);

      }

    })

  }

}
