import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {

elements = [{

            title : "Mi portfolio",
            url : "http://www.miportfolio.com",
            info: "Mi proyecto de portfolio en React"
},

{

  title : "Calculator app",
  url : "http://www.calculator.com",
  info: "Mi proyecto de calculadora en Java"

}]

  constructor() { }

  ngOnInit(): void {
  }

}
