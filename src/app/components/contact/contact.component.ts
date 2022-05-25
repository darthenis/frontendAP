import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { faTimes, faSpinner, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { AboutMe } from '../about-me/type';
import { ReCaptchaV3Service } from 'ng-recaptcha';
import { UserDataService } from 'src/app/services/user-data.service';
import { AlertifyService } from 'src/app/services/alertify.service';
import { ActivatedRoute, Route } from '@angular/router';
import { LoadingService } from 'src/app/services/loading.service';



@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  @Input() socialNetWorks : AboutMe;
  @Output() cancelEmit = new EventEmitter();
 
  faTimes = faTimes;
  faSpinner = faSpinner;
  faCheckCircle = faCheckCircle;

  formGroup : FormGroup;

  isInvalidForm = false;

  messageOn = false;

  isLoading$ = false;

  send = false;

  private activedUser: string;

  constructor(private fb : FormBuilder, 
              private recaptchaService: ReCaptchaV3Service, 
              private userDataService : UserDataService, 
              private alertifyService : AlertifyService,
              private activedRoute : ActivatedRoute,
              private loadingService : LoadingService){ 

    this.formGroup = this.fb.group({
                  name : ['', [Validators.required, Validators.pattern(/^[a-zA-Z]+$/)]],
                  email : ['', [Validators.required, Validators.email]],
                  message : ['', Validators.required]
    });

  }

  get Name(){

    return this.formGroup.get('name');

  }

  get Email(){
      
      return this.formGroup.get('email');
  
  }

  get Message(){

    return this.formGroup.get('message');

  }

  ngOnInit(): void {

    this.activedRoute.params.subscribe((param)=>{ 

      const {username} = param;

      this.activedUser = username;

    })

  }

  onSubmit(){

    if(this.formGroup.invalid){

      this.isInvalidForm = true;

    } else {

      this.isLoading$ = true;

      this.recaptchaService.execute('contact').subscribe({

        next: (token) =>  {this.userDataService.sendMessage(this.activedUser, this.formGroup.value, token).subscribe({

                              next: () => {

                                this.send = true;

                              },

                              error: () => this.alertifyService.error('Error sending message')

                            })
                          },

        error: (error) => console.log(error)
                         
                        })
     
      }
      

  }

  cancel(){

    this.cancelEmit.emit();
    
  }


}
