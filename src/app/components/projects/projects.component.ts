import { HttpClient } from '@angular/common/http';
import { Component, DoCheck, Input, OnChanges, OnInit, SimpleChange, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs/internal/Subject';
import { AuthService } from 'src/app/services/auth.service';
import { UserDataService } from 'src/app/services/user-data.service';
import { FormData } from '../dynamic-form/interfaces';
import { project } from './type';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit, OnChanges {

 @Input() subAddSection! : Subject<string>;
 
 @Input() authUser : boolean = false;
 
 public formData! : FormData;

 newSection : boolean = false;

 logged$ = this.authService.currentUser$;

 profileActived! : string;

 edit(id:number){

    this.projects = this.projects.map((e : project) => {

      if(e.id === id) return {...e, edit : !e.edit}
      return e;
      })

  }


  cancelNewForm(){

    this.newSection = false;

  }

  delete(){
    console.log("delete")
  }

projects! : project[];

  constructor(private http : HttpClient, private userDataService : UserDataService, private route : ActivatedRoute, private authService : AuthService) {}



  ngOnInit(): void {

    this.route.params.subscribe( (param : any) => {

      const { username } = param;

      this.userDataService.getProject$().subscribe( (data : any) => {

          this.projects = data;

      });

      this.profileActived = username;

      })

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

}
