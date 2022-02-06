import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.css']
})
export class EducationComponent implements OnInit {

  elements =[{
    title: "Secundario",
    name : "Media 31, ex comercial San Martin",
    initDate : "marzo - 2007",
    endDate : "diciembre - 2010",
    carrer : "Bachillerato en economía y gestión de empresas",
  },
  {
    title: "Curso",
    name : "Centro de formación n451",
    initDate : "marzo - 2019",
    endDate : "noviembre - 2019",
    career : "Programacion"
  }]

  constructor() { }

  ngOnInit(): void {
  }

}
