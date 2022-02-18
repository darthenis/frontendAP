import { HttpClient } from '@angular/common/http';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import {faTimes} from '@fortawesome/free-solid-svg-icons';
import { Subject } from 'rxjs/internal/Subject';
import { FormData } from '../dynamic-form/interfaces';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})
export class SkillsComponent implements OnInit, OnChanges {

  @Input() subAddSection! : Subject<string> | undefined;

  faTimes = faTimes;

  public formData! : FormData;

  newSection : boolean = false;

  colorCircle = '#273c75';


  edit(id : number){

    this.elements = this.elements.map(e => {

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

  elements : any[] = [{
          id : 1,
          name : "HTML",
          porcent: 90,
          edit: false
  },
  {
          id : 2,
          name : "CSS",
          porcent: 70,
          edit: false
  },
  {
          id : 3,
          name : "JS",
          porcent: 70,
          edit: false
}]

display = this.elements.length ? 'block' : 'none';

  constructor(private http : HttpClient) { }

  ngOnInit(): void {

    this.http
      .get('/assets/skills.json')
      .subscribe( (formData : any) => {
        this.formData = formData;
      });

  }

  ngOnChanges(changes : SimpleChanges){

    changes['subAddSection']?.currentValue?.subscribe( (section : string) => {

      if(section === 'skill'){

        this.newSection = true;

      }

    })

  }

}
