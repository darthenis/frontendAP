
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormData } from '../dynamic-form/interfaces';
import { HttpClient} from '@angular/common/http'
import { Subject } from 'rxjs/internal/Subject';
import { education } from './type';
import { UserDataService } from 'src/app/services/user-data.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.css']
})
export class EducationComponent implements OnInit, OnChanges {

  @Input() subAddSection! : Subject<string>;

  @Input() authUser : boolean = false;

  public formData! : FormData;

  newSection : boolean = false;

  public educations! : education[];

  edit(id : number){
    
    this.educations = this.educations.map((e : education) => { 

        if(e.id === id) return {...e, edit : !e.edit}

        return e;

     })
    

  }

  
  cancelNewForm(){

    this.newSection = false;


  }

 

  display = 'block';

  constructor(private http : HttpClient, 
              private userDataService : UserDataService,
              private route : ActivatedRoute){

                

              }

  ngOnInit(){
    this.http
      .get('/assets/education.json')
      .subscribe( (formData : any) => {

          this.formData = formData;
          
      });

      this.route.params.subscribe( (params : any) => {

        const { username } = params; 
  
        this.userDataService.getEducation$().subscribe( (data : education[]) => {
  
              this.educations = data;
  
        })
  
      })



  }

  ngOnChanges(changes:SimpleChanges){

    changes['subAddSection']?.currentValue?.subscribe( (section : string) => {

      if(section === 'education'){

        this.newSection = true;

      }

    })
  }

  delete(){

    console.log('delete')

  }

}
