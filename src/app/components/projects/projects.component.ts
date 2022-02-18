import { HttpClient } from '@angular/common/http';
import { Component, DoCheck, Input, OnChanges, OnInit, SimpleChange, SimpleChanges } from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';
import { FormData } from '../dynamic-form/interfaces';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit, OnChanges {

 @Input() subAddSection! : Subject<string> | undefined;

 addSection! : string;

 public formData! : FormData;


 newSection : boolean = false;


 edit(id:number){

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
            title : "Mi portfolio",
            url : "http://www.miportfolio.com",
            imgUrl: "",
            info: "Mi proyecto de portfolio en React",
            edit: false
},

{
  id : 2,
  title : "Calculator app",
  url : "http://www.calculator.com",
  imgUrl: "",
  info: "Mi proyecto de calculadora en Java",
  edit: false

}]

display = this.elements.length ? 'block' : 'none';

  constructor(private http : HttpClient) {}



  ngOnInit(): void {

    this.http
      .get('/assets/project.json')
      .subscribe( (formData : any) => {
          this.formData = formData;
      });

  }

  ngOnChanges(changes: SimpleChanges): void {

    changes['subAddSection']?.currentValue?.subscribe( (section : string) => {

      if(section === 'project'){

        this.newSection = true;

      }

    })
      
  }


  newAddSection(){

      console.log("subAddSection: ", this.subAddSection);

      this.subAddSection?.subscribe( (section : string) => {
        
        
      })


  }

}
