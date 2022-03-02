import { HttpClient } from '@angular/common/http';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {faPenSquare, faTimes } from '@fortawesome/free-solid-svg-icons';
import { Subject } from 'rxjs/internal/Subject';
import { AuthService } from 'src/app/services/auth.service';
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

  public formData! : FormData;

  profileActived! : string;

  newSection : boolean = false;

  experiences! : experience[];

  edit(id : number){

    this.experiences = this.experiences.map((e : experience) => {
    
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

  faPenSquare = faPenSquare;
  faTimes = faTimes;

  display : string = 'block';

 

  constructor(private http : HttpClient, private userDataService : UserDataService, private route : ActivatedRoute, private storageService : StorageService, private authService : AuthService ) { 


  }

  ngOnInit(): void {

    this.http
    .get('/assets/experience.json')
    .subscribe( (formData : any) => {

        this.formData = formData;
        
    });

    this.route.params.subscribe( (params : any) => {

      const { username } = params; 

      this.userDataService.getExperience$().subscribe( (data : experience[]) => {

            this.experiences = data;

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


  updateData(data : experience, id : number){

   

  }


 async newData(data : experience){

  console.log('newData', data)

  this.route.params.subscribe( (params : any)  => {

    const { username } = params;

    this.storageService.uploadImage(data.logoUrl).then(url => {

      console.log('url', url)


    })

  })

 }


}
