import { HttpClient } from '@angular/common/http';
import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import {faPenSquare, faCamera } from '@fortawesome/free-solid-svg-icons';
import { FormData } from '../dynamic-form/interfaces';
import { socialNetWorks } from '../interfaces/socialNetWorks';




@Component({
  selector: 'app-about-me',
  templateUrl: './about-me.component.html',
  styleUrls: ['./about-me.component.css']
})

export class AboutMeComponent implements OnInit {

@Output() onInfo = new EventEmitter<socialNetWorks>();

@Output() onAddSection = new EventEmitter<string>();

socialNetworks! : socialNetWorks;

  faPenSquare = faPenSquare;
  faCamera = faCamera;

  section = false;

  formData! : FormData;

  editMode = false;

  edit(){

    this.editMode = !this.editMode;

  }

  addSection(section : string){

    this.onAddSection.emit(section);

  }

  aboutMe = {
      id: 1,
      name: 'Juan Carlos',
      lastName: 'Gonzalez',
      title: 'Full Stack Developer',
      country: 'Mexico',
      state: 'Guadalajara',
      city: 'Jalisco',
      avatarUrl : '',
      bannerUrl : '',
      aboutMe : 'I am a full stack developer with a passion for creating beautiful and intuitive user interfaces I have a background in business and marketing, and I am currently pursuing a degree in computer science. I am currently working on a project that will all',
      facebook: 'https://www.facebook.com/juan.gonzalez.9',
      twitter: 'https://twitter.com/juan_gonzalez_',
      instagram: 'https://www.instagram.com/juan_gonzalez_/',
      linkedin: 'https://www.linkedin.com/in/juan-carlos-gonzalez-a9a8b5a9/',
      github: ''

      }
  

  newSection() {
    this.section = !this.section;
  }

  loadNetworks() {

    this.socialNetworks = {
      facebook: this.aboutMe.facebook,
      twitter: this.aboutMe.twitter,
      instagram: this.aboutMe.instagram,
      linkedin: this.aboutMe.linkedin,
      github: this.aboutMe.github
    }

  }

  constructor(private http : HttpClient) { }

  ngOnInit(): void {

    this.http
        .get('/assets/aboutme.json')
        .subscribe((data : any) => {
          this.formData = data
        })

    this.loadNetworks();

    this.onInfo.emit(this.socialNetworks);

  }

}
