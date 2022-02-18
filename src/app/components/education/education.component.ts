
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormData } from '../dynamic-form/interfaces';
import { HttpClient} from '@angular/common/http'
import { Subject } from 'rxjs/internal/Subject';

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.css']
})
export class EducationComponent implements OnInit, OnChanges {

  @Input() subAddSection! : Subject<string> | undefined;

  public formData! : FormData;

  newSection : boolean = false;

  edit(id : number){

    this.elements = this.elements.map(e => { 
     if (e.id === id) return {...e, edit : !e.edit }
      return e
    })

  }

  cancelNewForm(){

    this.newSection = false;


  }

  elements : any[] =[{
    id: 1,
    title: "Secundario",
    name : "Media 31, ex comercial San Martin",
    initDate : "marzo - 2007",
    endDate : "diciembre - 2010",
    carrer : "Bachillerato en economía y gestión de empresas",
    imgUrl: "",
    edit : false
  },
  {
    id : 2,
    title: "Curso",
    name : "Centro de formación n451",
    initDate : "marzo - 2019",
    endDate : "noviembre - 2019",
    career : "Programacion",
    imgUrl: "",
    edit: false
  }]

  display = this.elements.length ? 'block' : 'none';

  constructor(private http : HttpClient) { }

  ngOnInit(){
    this.http
      .get('/assets/education.json')
      .subscribe( (formData : any) => {

          this.formData = formData;

          console.log(this.formData)
      });
  }

  ngOnChanges(changes:SimpleChanges){

    changes['subAddSection']?.currentValue?.subscribe( (section : string) => {

      if(section === 'education'){

        this.newSection = true;

      }

    })
  }

  delete(){}

}
