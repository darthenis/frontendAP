import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { HttpClient } from '@angular/common/http';
import { Component, DoCheck, HostListener, Input, OnChanges, OnInit, SimpleChange, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs/internal/Subject';
import { AuthService } from 'src/app/services/auth.service';
import { LoadingService } from 'src/app/services/loading.service';
import { StorageService } from 'src/app/services/storage.service';
import { UserDataService } from 'src/app/services/user-data.service';
import { FormData } from '../dynamic-form/interfaces';
import { project } from './type';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit, OnChanges {

 @Input() subAddSection : Subject<string>;
 
 public formData : FormData;

 newSection : boolean = false;

 logged$ = this.authService.currentUser$;

 isLoading$ = this.loadingService.isLoadingGet;

 profileActived! : string;

 projects : project[] = [];

 screenWidth : number;

 setProjects(projects : project[]){

  projects.sort((a, b) => a.order - b.order);

  this.projects = projects;

 }

 edit(id:number){

    this.projects = this.projects.map((e : project) => {

      if(e.id === id) return {...e, edit : !e.edit}
      return e;
      })

  }


  cancelNewForm(origin : string){

    if(origin === 'boton'){

      this.newSection = false;

    }

  }

  delete(id : number){
    this.userDataService.deleteProject(id).subscribe({

      next: () => {
        this.projects = this.projects.filter((e : project) => e.id !== id);
      },
      error: () => console.log('error')

    })
  }



resume = true;

  getProjects(){

    if(this.resume){

      let newArray : project[]= [];

      let count = 0;
      
      this.projects.forEach( (e : project) => {

      if(this.screenWidth > 609){

        if(count < 3){

          newArray.push(e);
          count++;

        }

      }else if( count < 2){

        newArray.push(e);
        count++;

      }

      } );

      return newArray;

    }

    return this.projects;

  }

  @HostListener('window:resize', ['$event'])
  onResize(event : Event) {

    this.screenWidth = window.innerWidth;

  }

  resumeChange(resume : boolean){

    this.resume = resume;

  }

  constructor(private http : HttpClient, 
              private userDataService : UserDataService, 
              private route : ActivatedRoute, 
              private authService : AuthService,
              private storageService : StorageService,
              private loadingService : LoadingService) {}



  ngOnInit(): void {

      this.screenWidth = window.innerWidth;

      let username = this.route.snapshot.paramMap.get('username')!;

      this.userDataService.getProject$(username).subscribe( (data : any) => {

          this.setProjects(data);

      });

      this.profileActived = username;

    

    this.http
      .get('/assets/project.json')
      .subscribe( (formData : any) => {
          this.formData = formData;
      });

    

  }

  ngOnChanges(changes: SimpleChanges): void {

    changes['subAddSection']?.currentValue?.subscribe( (section : string) => {

      if(section === 'project'){

        this.newSection = true;

      }

    })
      
  }

  async newData(data : project){

    data.order = this.projects.length + 1;

    if(data.picUrl) data.picUrl = await this.storageService.uploadImage(data.picUrl, this.authService.currentUserValue.id);
    
    this.userDataService.createProject(data).subscribe({

        next: (result : any) => {
            this.setProjects(result);
            this.newSection = false;
          },
        error: () => console.log('error')

      })

  }

  async updateData(data : project, id : number){

    data.id = id;
 
    if(data.picUrl && !(typeof data.picUrl == "string") ) data.picUrl = await this.storageService.uploadImage(data.picUrl, this.authService.currentUserValue.id);
 
    this.userDataService.editProjects([data]).subscribe({
 
       next: () => {
 
         this.projects = this.projects.map(e => e.id === id ? data : e);
 
       },
       error: () => console.log('error')
 
 
    })
 
   }

   onDrop(event : CdkDragDrop<any>){

    this.projects[event.previousContainer.data.index] = event.container.data.item;
    
    this.projects[event.container.data.index] = event.previousContainer.data.item;

    this.projects = this.projects.map(e => {
            
            e.order = this.projects.indexOf(e) + 1;

            return e;

    })

    this.userDataService.editProjects(this.projects).subscribe({

      error: () => console.log('error')

    })

  }

}
