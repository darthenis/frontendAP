import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { HttpClient } from '@angular/common/http';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {faPenSquare, faTimes } from '@fortawesome/free-solid-svg-icons';
import { Subject } from 'rxjs/internal/Subject';
import { AuthService } from 'src/app/services/auth.service';
import { LoadingService } from 'src/app/services/loading.service';
import { StorageService } from 'src/app/services/storage.service';
import { UserDataService } from 'src/app/services/user-data.service';
import { FormData } from '../dynamic-form/interfaces';
import { experience } from './type';


@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.css']
})
export class ExperienceComponent implements OnInit, OnChanges {


  @Input() subAddSection! : Subject<string>;

  @Input() authUser : boolean = false;

  logged$ = this.authService.currentUser$

  isLoading$ = this.loadingService.isLoadingGet;

  public formData! : FormData;

  profileActived! : string;

  newSection : boolean = false;

  experiences : experience[] = [];

  resume = true;

  setExperiences(experiences : experience[]){

    experiences.sort( (a : experience, b : experience) => a.order - b.order );

    this.experiences = experiences;

  }

  getExperiences(){

    if(this.resume){

      let newArray : experience[]= [];

      let count = 0;
      
      this.experiences.forEach( (e : experience) => {

        if(count < 2){

          newArray.push(e);
          count++;

        }

      } );

      return newArray;

    }

    return this.experiences;

  }

  resumeChange(resume : boolean){

    this.resume = resume;

  }

  edit(id : number){

    this.experiences = this.experiences.map((e : experience) => {
    
      if(e.id === id) return {...e, edit : !e.edit}
      return e;
      })
  }

  checkIndex(id : number){

    return 0 !== this.experiences.findIndex( (e : experience) => e.id === id );

  }
  cancelNewForm(origin : string){

    if(origin === 'boton'){

      this.newSection = false;

    }

  }

  changeFormatDate(oldDate : string){
    if(oldDate){

      var p = oldDate.split(/\D/g)
      return [p[2],p[1],p[0] ].join("/")

    } 

    return null;
    
 }

  delete(id : number){

    this.userDataService.deleteExperience(id).subscribe({

      next: () => {

          this.experiences = [...this.experiences.filter( (e : experience) => e.id !== id )];
      },
      error: () => console.log('error')
    });

  }

  faPenSquare = faPenSquare;
  faTimes = faTimes;

  display : string = 'block';

 

  constructor(private http : HttpClient, 
              private userDataService : UserDataService, 
              private route : ActivatedRoute, 
              private storageService : StorageService, 
              private authService : AuthService,
              private loadingService : LoadingService) {


  }

  ngOnInit(): void {

    console.log('iniciando')

    this.http
    .get('/assets/experience.json')
    .subscribe( (formData : any) => {

        this.formData = formData;
        
    });

    this.route.params.subscribe( (params : any) => {

      const { username } = params; 

      this.userDataService.getExperience$(username).subscribe( (data : experience[]) => {

            this.setExperiences(data);

            console.log("experience: ", data)

      })

      this.profileActived = username;

    })
    

  }

  ngOnChanges(changes : SimpleChanges){

    changes['subAddSection']?.currentValue?.subscribe( (section : string) => {

      if(section === 'experience'){

        this.newSection = true;

      }

    })

  }


  async updateData(data : experience, id : number){

   data.id = id;

   if(data.logoUrl && !(typeof data.logoUrl == "string") ) data.logoUrl = await this.storageService.uploadImage(data.logoUrl);

   this.userDataService.editExperiences([data]).subscribe({

      next: () => {

        this.experiences = this.experiences.map(e => e.id === id ? data : e);

      },
      error: () => console.log('error')


   })

  }


  async newData(data : experience){

    data.order = this.experiences.length + 1;

    if(data.logoUrl && !(typeof data.logoUrl == "string") ) data.logoUrl = await this.storageService.uploadImage(data.logoUrl);
      
      this.userDataService.createExperience(data).subscribe({

          next: (response : any) => {
              this.setExperiences(response);
              this.newSection = false;
            },
          error: () => console.log('error')

        })

  }

  onDrop(event : CdkDragDrop<experience[]>){

    moveItemInArray(this.experiences, event.previousIndex, event.currentIndex);

    this.experiences = this.experiences.map(e => {
            
            e.order = this.experiences.indexOf(e) + 1;

            return e;

    })

    this.userDataService.editExperiences(this.experiences).subscribe({

      error: () => console.log('error')

    })

  }

}
