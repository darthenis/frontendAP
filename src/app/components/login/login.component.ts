import { Component, OnInit } from '@angular/core';
import { faUser, faKey, faEye, faEyeSlash} from '@fortawesome/free-solid-svg-icons';


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

  passwordHide = true;

  hidePassword() {

    this.passwordHide = !this.passwordHide;

  }

  iconPassword = this.passwordHide ? faEye : faEyeSlash;

  constructor() { }

  ngOnInit(): void {
  }

}
