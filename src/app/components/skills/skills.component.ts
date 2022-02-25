import { HttpClient } from '@angular/common/http';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {faTimes} from '@fortawesome/free-solid-svg-icons';
import { Subject } from 'rxjs/internal/Subject';
import { UserDataService } from 'src/app/services/user-data.service';
import { FormData } from '../dynamic-form/interfaces';
import { skill } from './type';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})
export class SkillsComponent implements OnInit, OnChanges {

  @Input() subAddSection! : Subject<string>;

  @Input() authUser : boolean = false;
 
  faTimes = faTimes;

  public formData! : FormData;

  newSection : boolean = false;

  colorCircle = '#273c75';

  skills! :  skill[];


  edit(id : number){

    this.skills = this.skills.map((e : skill) => {

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




  constructor(private http : HttpClient, private userDataService : UserDataService, private route : ActivatedRoute) { }

  ngOnInit(): void {

    this.http
      .get('/assets/skills.json')
      .subscribe( (formData : any) => {
        this.formData = formData;
      });

      this.route.params.subscribe( (params : any) => { 

        const { username } = params;

        this.userDataService.getSkill$().subscribe( (skills : any) => {

          this.skills = skills;

        } ); 

       } )

  }

  ngOnChanges(changes : SimpleChanges){

    changes['subAddSection']?.currentValue?.subscribe( (section : string) => {

      if(section === 'skill'){

        this.newSection = true;

      }

    })

  }

}
