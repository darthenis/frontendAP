import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { experience } from '../portfolio/components/experience/type';
import { education } from '../portfolio/components/education/type';
import { skill } from '../portfolio/components/skills/type';
import { project } from '../portfolio/components/projects/type';
import { AboutMe } from '../portfolio/components/about-me/type';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class UserDataService {


apiUrl = environment.apiUrls.apiUrl;

constructor(private http : HttpClient) { }

getAboutMe$(username : string):Observable<any>
{
  if(username === 'emi') return this.http.get('assets/datainit/aboutMe.json');

  return this.http.get(this.apiUrl + `/${username}/person` );

}

getExperience$(username : string):Observable<any>
{
    
  return this.http.get(this.apiUrl + `/${username}/experience`);
  
}

getEducation$(username : string):Observable<any>
{
  return this.http.get(this.apiUrl + `/${username}/education`);
}

getSkill$(username : string):Observable<any>
{
  return this.http.get(this.apiUrl + `/${username}/skill`);
}

getProject$(username : string):Observable<any>
{
  return this.http.get(this.apiUrl + `/${username}/project`);
}

getMessages$():Observable<any>
{
  return this.http.get(this.apiUrl + `/service/messages`);
}

sendMessage(username : string, message : any, token: string) : Observable<any>{

  let param = new HttpParams().append("g-recaptcha-response", token);

  let data ={

    "username" : username,
    "name" : message.name,
    "email" : message.email,
    "message" : message.message
  }

  return this.http.post(this.apiUrl + `/service/message`, data, {params: param});

}

deleteMessage(id : number){

  return this.http.delete(this.apiUrl + `/service/message/${id}`);

}

setSeenMessage(id : number) : Observable<any>{


  return this.http.put(this.apiUrl + `/service/message/${id}`, {});

}

editAboutme(aboutMe : AboutMe){

  return this.http.put(this.apiUrl + `/user/person`, aboutMe);

}

createExperience(experience: experience){

  console.log("experience", experience);

  return this.http.post(this.apiUrl+'/user/experience', experience);

}

editExperiences(experience: experience[]){

  console.log('editando', experience);

  return this.http.put(this.apiUrl+'/user/experience', experience);

}

deleteExperience(id : number){


  return this.http.delete(this.apiUrl+'/user/experience/'+id);

}

createEducation(education : education){

  return this.http.post(this.apiUrl+'/user/education', education);

}

editEducation(education : education[]){

  return this.http.put(this.apiUrl+'/user/education', education);

}


deleteEducation(id : number){

  return this.http.delete(this.apiUrl+'/user/education/'+id);

}


createSkill(skill : skill){

  let data = {
      name : skill.name,
      porcent : skill.porcent
  }


  return this.http.post(this.apiUrl+'/user/skill', data);

}

editSkills(skills : skill[]){

  return this.http.put(this.apiUrl+'/user/skill', skills);

}

deleteSkill(id : number){

  return this.http.delete(this.apiUrl+'/user/skill/'+id);

}

createProject(project : project){

  return this.http.post(this.apiUrl+'/user/project', project);

}

editProjects(projects : project[]){

  return this.http.put(this.apiUrl+'/user/project', projects);

}

deleteProject(id : number){

  return this.http.delete(this.apiUrl+'/user/project/'+id);

}

}
