import { Component, OnInit } from '@angular/core';
import {faPenSquare, faTimes } from '@fortawesome/free-solid-svg-icons';
import { experience } from './type';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.css']
})
export class ExperienceComponent implements OnInit {

  edit(id : number){

    this.elements = this.elements.map(e => {
    
      if(e.id === id) return {...e, edit : !e.edit}
      return e;
      })
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
      initDate : "julio - 2019",
      endDate : "diciembre - 2020",
      job : "Repositor",
      info : "Encargado de reponer y limpieza",
      urlImg : "img",
      edit : false
      
    },
    {
      id : 2,
      title : "Desarrollador web",
      name : "Financias SA",
      initDate : "enero - 2021",
      endDate : "enero - 2022",
      job : "desarrollo en frontend",
      info : "Encargado diseño e implementación de soluciones para usuarios con una buena experiencia",
      urlImg : "img",
      edit : false
    }]


  display = this.elements.length ? 'block' : 'none';

  constructor() { }

  ngOnInit(): void {
  }

}
