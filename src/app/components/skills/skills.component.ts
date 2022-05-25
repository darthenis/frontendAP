import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { HttpClient } from '@angular/common/http';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {faTimes, faArrowDown, faArrowUp, faAngleDown, faAngleUp} from '@fortawesome/free-solid-svg-icons';
import { Subject } from 'rxjs/internal/Subject';
import { AuthService } from 'src/app/services/auth.service';
import { LoadingService } from 'src/app/services/loading.service';
import { UserDataService } from 'src/app/services/user-data.service';
import { FormData } from '../dynamic-form/interfaces';
import { skill } from './type';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})
export class SkillsComponent implements OnInit, OnChanges {

  @Input() subAddSection : Subject<string>;

  @Input() authUser : boolean = false;
 
  faTimes = faTimes;

  public formData : FormData;

  newSection : boolean = false;

  colorCircle = '#273c75';

  logged$ = this.authService.currentUser$

  isLoading$ = this.loadingService.isLoadingGet;

  profileActived : string;

  skills :  skill[];

  resume = true;

  setSkills(skills : skill[]){

    skills.sort( (a : skill, b : skill) => a.order - b.order );

    this.skills = skills;

  }

  getSkills(){

    if(this.resume){

      let newArray : skill[]= [];

      let count = 0;
      
      this.skills.forEach( (e : skill) => {

        if(count < 3){

          newArray.push(e);
          count++;

        }

      } );

      return newArray;

    }

    return this.skills;

  }

  resumeChange(e : boolean){

    this.resume = e;

  }

  overMouse : boolean = false;

  itemOvered : number = 0;

  getNames(id : number){

    if(this.overMouse && this.itemOvered === id){

      let porcent = this.skills.find( (e : skill) => e.id === id )?.porcent!;

      if(porcent <= 25){

        return "Trainee";

      } else if(porcent <= 50){

        return "Junior";

      } else if(porcent <= 75){

        return "SSenior";

      } else if(porcent <= 100){

        return "Senior";

      }

    }

    return this.skills.find( (e : skill) => e.id === id )?.name;

  }

  over(id : number){

    this.overMouse = !this.overMouse;

    this.itemOvered = this.itemOvered === 0 ? id : 0;

  }

  hoverColor(id : number){

    if(id === this.itemOvered){

      return '#3e61c2';

    } else {
        
        return '#273c75';
  
      }


  }


  edit(id : number){

    this.skills = this.skills.map((e : skill) => {

      if(e.id === id) return {...e, edit : !e.edit}
      return e;
      })

  }


  cancelNewForm(){

    this.newSection = false;

  }


  delete(id : number){

    this.userDataService.deleteSkill(id).subscribe( {

      next : () => {
          
         this.skills = this.skills.filter( (e : skill) => e.id !== id );
  
      },
      error : (error) => console.log(error)


    })

  }




  constructor(private http : HttpClient, 
              private userDataService : UserDataService, 
              private route : ActivatedRoute, 
              private authService : AuthService,
              private loadingService : LoadingService) { }

  ngOnInit(): void {

    this.http
      .get('/assets/skills.json')
      .subscribe( (formData : any) => {
        this.formData = formData;
      });

      this.route.params.subscribe( (params : any) => { 

        const { username } = params;

        this.userDataService.getSkill$(username).subscribe( (skills : any) => {

          this.setSkills(skills);

        });
        
        this.profileActived = username;

       } )

  }

  ngOnChanges(changes : SimpleChanges){

    changes['subAddSection']?.currentValue?.subscribe( (section : string) => {

      if(section === 'skill'){

        this.newSection = true;

      }

    })

  }

  newData(data : skill){

    data.order = this.skills.length + 1;

    this.userDataService.createSkill(data).subscribe( {

      next : (data : any) => {

          this.setSkills(data);

          this.newSection = false;

      },
      error: (error) => console.log(error)

    } )

  }

  updateData(data : skill, id : number){

    data.id = id;
 
    this.userDataService.editSkills([data]).subscribe({
 
       next: () => {
 
         this.skills = this.skills.map(e => e.id === id ? data : e);
 
       },
       error: () => console.log('error')
 
 
    })


  }

  onDrop(event : CdkDragDrop<any>){

    this.skills[event.previousContainer.data.index] = event.container.data.item;
    
    this.skills[event.container.data.index] = event.previousContainer.data.item;

    this.skills = this.skills.map(e => {
            
            e.order = this.skills.indexOf(e) + 1;

            return e;

    })

    this.userDataService.editSkills(this.skills).subscribe({

      error: () => console.log('error')

    })

  }

}
