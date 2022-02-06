import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})
export class SkillsComponent implements OnInit {

  colorCircle = 'rgb(64, 175, 50)';

  elements = [{
          name : "HTML",
          porcent: 90
  },
  {
          name : "CSS",
          porcent: 70
  },
  {
          name : "JS",
          porcent: 70
}]


  constructor() { }

  ngOnInit(): void {
  }

}
