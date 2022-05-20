import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { faSpinner, faEye, faEyeSlash, faKey, faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { LoadingService } from 'src/app/services/loading.service';
import { IHidePassword } from './type';
import { AlertifyService } from 'src/app/services/alertify.service';

@Component({
  selector: 'app-recovery-pass',
  templateUrl: './recovery-pass.component.html',
  styleUrls: ['./recovery-pass.component.css']
})
export class RecoveryPassComponent implements OnInit {

  email! : string;

  password! : string;

  rPassword! : string;

  passwordHide : IHidePassword = { pass: false,
                                   rPass: false}

  checkCode = false;

  changePass = false;

  done = false;

  faSpinner = faSpinner;

  faEye = faEye;

  faEyeSlash = faEyeSlash;

  faKey = faKey;

  faTimesCircle = faTimesCircle;

  faCheckCircle = faCheckCircle;

  loading$ = this.loadingService.isLoadingPost;

  resendLoading = false;

  regex =  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");

  checkEmail(){

    return this.regex.test(this.email);

  }

  checkPass(){

    return this.password === this.rPassword;

  }

  checkPassValue(){

    return !this.strongRegex.test(this.password) && this.password;

  }

  hidePassword(key : string){

    this.passwordHide = {...this.passwordHide, [key]: !this.passwordHide[key]};

  }

  onSubmit(){

    this.authService.getCode(this.email).subscribe({

      next : (response) => this.checkCode = true,
      error : (err) => console.log(err)

    });

  }

  onSubmitPass(){

    if(this.checkPass()){

      this.authService.changePass(this.password).subscribe({

        next : (response) => { this.changePass = false; this.done = true },
        error : (err) => console.log(err)

      })

    } else {

      this.alertifyService.warning('Las contraseñas deben coincidir');

    }

  }

  onCodeCompleted(event : string){

    console.log('onCodeCompleted', event)

    this.authService.checkCode(parseInt(event)).subscribe({

      next : (response) =>{  this.checkCode = false; this.changePass = true},
      error : (err) => console.log(err)


    })

  }

  resendEmail(){

    this.resendLoading = true;

    this.authService.getCode(this.email).subscribe({

      next : (response) => this.resendLoading = false,
      error : (err) => this.resendLoading = false


    })

  }

  constructor(  private authService : AuthService,
                private loadingService : LoadingService,
                private alertifyService : AlertifyService) { }

  ngOnInit(): void {
  }

}
