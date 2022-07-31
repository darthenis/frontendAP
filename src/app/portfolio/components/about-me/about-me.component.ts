import { HttpClient } from '@angular/common/http';
import { Component, OnInit, EventEmitter, Output, Input, OnChanges, SimpleChanges, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {faPenSquare, faCamera, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../../../services/auth.service';
import { LoadingService } from '../../../services/loading.service';
import { StorageService } from '../../../services/storage.service';
import { UserDataService } from '../../../services/user-data.service';
import { FormData } from '../interfaces';
import { socialNetWorks } from '../interfaces/socialNetWorks';
import { AboutMe } from './type';




@Component({
  selector: 'app-about-me',
  templateUrl: './about-me.component.html',
  styleUrls: ['./about-me.component.css']
})

export class AboutMeComponent implements OnInit {

@Output() onAddSection = new EventEmitter<string>();

@Output() userExist = new EventEmitter();

@Input() authUser : boolean;

aboutMe : AboutMe = {} as AboutMe;

isAuthenticated$ : boolean;

socialNetworks : socialNetWorks;

  faPenSquare = faPenSquare;
  faCamera = faCamera;
  faSpinner = faSpinner;

  section = false;

  formData : FormData;

  typePicture : string = '';

  addPhotoForm : FormData;

  editMode = false;

  logged$ = this.authService.currentUser$

  isLoading$ = this.loadingService.isLoadingGet;
  
  profileActived : string;

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

      return {
          github : this.aboutMe.github,
          linkedin : this.aboutMe.linkedin,
          instagram : this.aboutMe.instagram,
          facebook : this.aboutMe.facebook,
          twitter : this.aboutMe.twitter
      }
  }

  areNetworks(){

    if(this.aboutMe.instagram || this.aboutMe.facebook || this.aboutMe.twitter || this.aboutMe.linkedin || this.aboutMe.github){

      return true;

    }else{

      return false;

    }

  }

  constructor(private http : HttpClient, 
              private userDataService : UserDataService, 
              private route : ActivatedRoute, 
              private router : Router, 
              private authService : AuthService,
              private storageService : StorageService,
              private loadingService : LoadingService) { 


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

          this.profileActived = username;
  
          this.userDataService.getAboutMe$(username).subscribe({ 
            
            next: aboutMe => {

                this.aboutMe = {...aboutMe}; 
    
                this.loadNetworks();
    
                this.userExist.emit();
            },
            error: err => this.router.navigate(['/not-found'])
  
          })
  
          
  
    })
    
  }


  changePic(type : string){

    this.typePicture = type;

    this.editPicture = true;

  }

  cancelPic(){

    this.editPicture = false;

  }

 async newPic( pic : any){
    
    this.loadingService.setLoadingPost(true);

    if(this.typePicture === 'profile'){

      this.aboutMe.profile = await this.storageService.uploadImage(pic.img, this.authService.currentUserValue.id);

    }else{

      this.aboutMe.banner = await this.storageService.uploadImage(pic.img, this.authService.currentUserValue.id);
    }

      this.userDataService.editAboutme(this.aboutMe).subscribe({

            next: () => {
                          this.loadingService.setLoadingPost(false);
                          this.editPicture = false;},

            error: error => console.log(error)
      })

    }

   

  async newData(data : AboutMe){
    
    let newData = {...this.aboutMe};

    newData = {...newData, ...data};

    this.userDataService.editAboutme(newData).subscribe({

        next: () => {
            this.aboutMe = {...newData};
            this.editMode = false;
          },
        error: () => console.log('error')

      })

  }

  isOpenContact = false;

  isOpenNetworks = false;

  openContact(){

    this.isOpenContact = !this.isOpenContact;

  }

  openNetworks(){

    this.isOpenNetworks = !this.isOpenNetworks;

  }

  getNetworks(){

    return [this.aboutMe.instagram, this.aboutMe.facebook, this.aboutMe.twitter, this.aboutMe.linkedin, this.aboutMe.github];

  }
}
