import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { experience } from '../components/experience/type';


@Injectable({
  providedIn: 'root'
})
export class UserDataService {


constructor(private http : HttpClient) { }

getAboutMe$(username : string):Observable<any>
{
  if(username === 'darthenis') return this.http.get('assets/datainit/aboutMe.json');

  return this.http.get('assets/datainit/error.json');

}

getExperience$():Observable<any>
{
    
  return this.http.get('/assets/datainit/experience.json');
  
}

getEducation$():Observable<any>
{
  return this.http.get('assets/datainit/education.json');
}

getSkill$():Observable<any>
{
  return this.http.get('assets/datainit/skill.json');
}

getProject$():Observable<any>
{
  return this.http.get('assets/datainit/project.json');
}


setExperience(experience: experience){

  let data = {
      id : experience.id,
      title : experience.title,
      name : experience.name,
      initDate : experience.initDate,
      endDate : experience.endDate,
      job : experience.job,
      commentary : experience.commentary,
      logoUrl : experience.logoUrl
  }

  return this.http.post('/assets/datainit/experience.json', data);

}


}
