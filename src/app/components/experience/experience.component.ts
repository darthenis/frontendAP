import { HttpClient } from '@angular/common/http';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import {faPenSquare, faTimes } from '@fortawesome/free-solid-svg-icons';
import { Subject } from 'rxjs/internal/Subject';
import { FormData } from '../dynamic-form/interfaces';
import { experience } from './type';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.css']
})
export class ExperienceComponent implements OnInit, OnChanges {

  @Input() subAddSection! : Subject<string> | undefined;

  public formData! : FormData;

  newSection : boolean = false;

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

  faPenSquare = faPenSquare;
  faTimes = faTimes;

  elements: experience [] =[{
      id: 1,
      title : "Supermercado",
      name : "Argenchino",
      initDate : "2019-01-01",
      endDate : "2020-01-20",
      job : "Repositor",
      info : "Encargado de reponer y limpieza",
      imgUrl : "",
      edit : false
      
    },
    {
      id : 2,
      title : "Desarrollador web",
      name : "Financias SA",
      initDate : "2021-01-01",
      endDate : "2022-01-20",
      job : "desarrollo en frontend",
      info : "Encargado diseño e implementación de soluciones para usuarios con una buena experiencia",
      imgUrl : "",
      edit : false
    }]


  display = this.elements.length ? 'block' : 'none';

  constructor(private http : HttpClient ) { }

  ngOnInit(): void {

    this.http
    .get('/assets/experience.json')
    .subscribe( (formData : any) => {

        this.formData = formData;
        
    });

  }

  ngOnChanges(changes : SimpleChanges){

    changes['subAddSection']?.currentValue?.subscribe( (section : string) => {

      if(section === 'experience'){

        this.newSection = true;

      }

    })

  }

}
