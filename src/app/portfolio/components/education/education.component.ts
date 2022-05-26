
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormData } from '../dynamic-form/interfaces';
import { HttpClient} from '@angular/common/http'
import { Subject } from 'rxjs/internal/Subject';
import { education } from './type';
import { UserDataService } from 'src/app/services/user-data.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { StorageService } from 'src/app/services/storage.service';
import { LoadingService } from 'src/app/services/loading.service';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.css']
})
export class EducationComponent implements OnInit, OnChanges {

  @Input() subAddSection : Subject<string>;

  profileActived : string;

  public formData : FormData;

  newSection : boolean = false;

  public educations : education[] = [];

  resume = true;

  logged$ = this.authService.currentUser$;
  isLoading$ = this.loadingService.isLoadingGet;

  setEducations(educations : education[]){

    educations.sort( (a : education, b : education) => a.order - b.order );

    this.educations = educations;

  }

  getEducations(){

    if(this.resume){

      let newArray : education[]= [];

      let count = 0;
      
      this.educations.forEach( (e : education) => {

        if(count < 2){

          newArray.push(e);
          count++;

        }

      } );

      return newArray;

    }

    return this.educations;

  }

  resumeChange(resume : boolean){

    this.resume = resume;

  }

  onDrop(event : CdkDragDrop<education[]>){

    moveItemInArray(this.educations, event.previousIndex, event.currentIndex);

    this.educations = this.educations.map(e => {
            
            e.order = this.educations.indexOf(e) + 1;

            return e;

    })

    this.userDataService.editEducation(this.educations).subscribe({

      error: () => console.log('error')

    })

  }

  edit(id : number){
    
    this.educations = this.educations.map((e : education) => { 

        if(e.id === id) return {...e, edit : !e.edit}

        return e;

     })
    

  }

  checkIndex(id : number){

    return 0 !== this.educations.findIndex( (e : education) => e.id === id );

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




  display = 'block';

  constructor(private http : HttpClient, 
              private userDataService : UserDataService,
              private route : ActivatedRoute,
              private authService : AuthService,
              private storageService : StorageService,
              private loadingService : LoadingService) { 

                

              }

  ngOnInit(){
    this.http
      .get('/assets/education.json')
      .subscribe( (formData : any) => {

          this.formData = formData;
          
      });

      this.route.params.subscribe( (params : any) => {

        const { username } = params; 
  
        this.userDataService.getEducation$(username).subscribe( {
          next: (educations : any) => {
            educations ? this.setEducations(educations) : null;

          },
          error: (err) => this.display = 'none'
        })

        this.profileActived = username;
  
      })



  }

  ngOnChanges(changes:SimpleChanges){

    changes['subAddSection']?.currentValue?.subscribe( (section : string) => {

      if(section === 'education'){

        this.newSection = true;

      }

    })

  

  }

  delete(id : number){

    this.userDataService.deleteEducation(id).subscribe({

      next: () => {
          
        this.educations = this.educations.filter( (e : education) => e.id !== id );


        },
      error: () => console.log('error')



    })

  }

  async newData(data : education){

    if(data.logoUrl && !(typeof data.logoUrl == "string") ) data.logoUrl = await this.storageService.uploadImage(data.logoUrl);

    data.order = this.educations.length + 1;
      
      this.userDataService.createEducation(data).subscribe({

          next: (result : any) => {
              this.setEducations(result);

              this.newSection = false;
            },
          error: () => console.log('error')

        })


  }


  async editData(data : education, id : number){

    data.id = id;
      
    if(data.logoUrl && !(typeof data.logoUrl == "string") ) data.logoUrl = await this.storageService.uploadImage(data.logoUrl);
      
      this.userDataService.editEducation([data]).subscribe({

          next: (result : any) => {
            
              this.educations = this.educations.map( e => e.id === id ? data : e );

              this.newSection = false;
            },
          error: () => console.log('error')

        })


  }

}
