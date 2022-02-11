import { Component, OnInit } from '@angular/core';
import {faTimes} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})
export class SkillsComponent implements OnInit {

  faTimes = faTimes;

  colorCircle = '#273c75';

  elements : any[] = [{
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

display = this.elements.length ? 'block' : 'none';

  constructor() { }

  ngOnInit(): void {
  }

}
