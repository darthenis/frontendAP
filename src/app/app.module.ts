import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { AboutMeComponent } from './components/about-me/about-me.component';
import { ExperienceComponent } from './components/experience/experience.component';
import { EducationComponent } from './components/education/education.component';
import { SkillsComponent } from './components/skills/skills.component';
import { ProjectsComponent } from './components/projects/projects.component';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FooterComponent } from './components/footer/footer.component';
import { EditButtonsComponent } from './components/modules/edit-buttons/edit-buttons.component';
import { RoundProgressModule } from 'angular-svg-round-progressbar';
import { ButtonComponent } from './components/modules/button/button.component';
import { LoginComponent } from './components/login/login.component';
import { PortfolioComponent } from './components/portfolio/portfolio.component';
import { RegistrationComponent } from './components/registration/registration.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DynamicFormComponent } from './components/dynamic-form/dynamic-form.component';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AddSectionComponent } from './components/modules/add-section/add-section.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { UserDataService } from './services/user-data.service';
import { InterceptorJwtService } from './services/interceptorjwt.service';
import { InterceptorHttpErrorService } from './services/interceptor-http-error.service';
import { ConfirmEmailComponent } from './components/confirm-email/confirm-email.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AboutMeComponent,
    ExperienceComponent,
    EducationComponent,
    SkillsComponent,
    ProjectsComponent,
    FooterComponent,
    EditButtonsComponent,
    ButtonComponent,
    LoginComponent,
    PortfolioComponent,
    RegistrationComponent,
    DynamicFormComponent,
    AddSectionComponent,
    NotFoundComponent,
    ConfirmEmailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    RoundProgressModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule

  ],
  providers: [  UserDataService,
             {  provide: HTTP_INTERCEPTORS, useClass: InterceptorJwtService, multi: true},
             { provide: HTTP_INTERCEPTORS, useClass: InterceptorHttpErrorService, multi: true }],

  bootstrap: [AppComponent]
})
export class AppModule { }
