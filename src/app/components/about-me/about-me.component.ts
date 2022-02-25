import { HttpClient } from '@angular/common/http';
import { Component, OnInit, EventEmitter, Output, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {faPenSquare, faCamera } from '@fortawesome/free-solid-svg-icons';
import { UserDataService } from 'src/app/services/user-data.service';
import { FormData } from '../dynamic-form/interfaces';
import { socialNetWorks } from '../interfaces/socialNetWorks';
import { AboutMe } from './type';




@Component({
  selector: 'app-about-me',
  templateUrl: './about-me.component.html',
  styleUrls: ['./about-me.component.css']
})

export class AboutMeComponent implements OnInit {

@Output() onInfo = new EventEmitter<socialNetWorks>();

@Output() onAddSection = new EventEmitter<string>();

@Output() userExist = new EventEmitter();

@Input() authUser! : boolean;

aboutMe! : AboutMe;

isAuthenticated = false;

socialNetworks! : socialNetWorks;

  faPenSquare = faPenSquare;
  faCamera = faCamera;

  section = false;

  formData! : FormData;

  typePicture : string = '';

  addPhotoForm! : FormData;

  editMode = false;

  editPicture = false;

  edit(){

    this.editMode = !this.editMode;

  }

  addSection(section : string){

    this.onAddSection.emit(section);

  }


  newSection() {
    this.section = !this.section;
  }

  loadNetworks() {

      this.socialNetworks = {
        facebook: this.aboutMe?.facebook,
        twitter: this.aboutMe?.twitter,
        instagram: this.aboutMe?.instagram,
        linkedin: this.aboutMe?.linkedin,
        github: this.aboutMe?.github
      }

      this.onInfo.emit(this.socialNetworks);

  }

  constructor(private http : HttpClient, private userDataService : UserDataService, private route : ActivatedRoute, private router : Router) {


   }

  ngOnInit(): void {

    this.http
        .get('/assets/aboutme.json')
        .subscribe((data : any) => {
          this.formData = data
        })

    this.http
        .get('/assets/addPhoto.json')
        .subscribe((data : any) => {
          this.addPhotoForm = data
        })


    this.route.params.subscribe( (param : any) => {

          const {username} = param;
  
          this.userDataService.getAboutMe$(username).subscribe( (aboutMe : any) => { 
            
          if(aboutMe.error) {
  
            this.router.navigate(['/not-found'])
  
          } else {
  
            this.aboutMe = aboutMe; 

            this.loadNetworks();

            this.userExist.emit();
          }
  
          })
  
          
  
    })
  

     
  }


  
  changePic(type : string){

    console.log(this.addPhotoForm)

    this.editPicture = true;

    

  }

  cancelPic(){

    this.editPicture = false;

  }

}
