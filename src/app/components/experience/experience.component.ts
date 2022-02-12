import { Component, OnInit } from '@angular/core';
import {faPenSquare, faTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.css']
})
export class ExperienceComponent implements OnInit {

  edit(state : boolean, name : string){

    this.elements = this.elements.map(e => {
      if(e.name === name) return {...e, edit : !e.edit}
  
      return e;
      
      })
  }

  delete(){

    console.log("delete")

  }

  faPenSquare = faPenSquare;
  faTimes = faTimes;

  elements: any[] =[{
      title : "Supermercado",
      name : "Argenchino",
      initDate : "julio - 2019",
      endDate : "diciembre - 2020",
      job : "Repositor",
      info : "Encargado de reponer y limpieza",
      edit : false
    },
    {
      title : "Desarrollador web",
      name : "Financias SA",
      initDate : "enero - 2021",
      endDate : "enero - 2022",
      job : "desarrollo en frontend",
      info : "Encargado diseño e implementación de soluciones para usuarios con una buena experiencia",
      edit : false
    }]


  display = this.elements.length ? 'block' : 'none';

  constructor() { }

  ngOnInit(): void {
  }

}
