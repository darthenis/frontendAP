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
import { AlertifyService } from './services/alertify.service';
import { LoadingInterceptorService } from './services/loading-interceptor.service';
import { SkeletonComponent } from './components/about-me/skeleton/skeleton.component';
import { ArrowResumeComponent } from './components/modules/arrow-resume/arrow-resume.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatDividerModule } from '@angular/material/divider';
import { RecoveryPassComponent } from './components/recovery-pass/recovery-pass.component';
import { CodeInputModule } from 'angular-code-input';
import { ContactComponent } from './components/contact/contact.component';
import { SocialNetworksComponent } from './components/social-networks/social-networks.component';

import { RECAPTCHA_V3_SITE_KEY, RecaptchaV3Module } from 'ng-recaptcha';

import { environment } from '../environments/environment';
import { MessagesComponent } from './components/messages/messages.component';


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
    ConfirmEmailComponent,
    SkeletonComponent,
    ArrowResumeComponent,
    RecoveryPassComponent,
    ContactComponent,
    SocialNetworksComponent,
    MessagesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    RoundProgressModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    DragDropModule,
    MatDividerModule,
    CodeInputModule,
    RecaptchaV3Module

  ],
  providers: [  UserDataService,
             {  provide: HTTP_INTERCEPTORS, useClass: InterceptorJwtService, multi: true},
             {  provide: HTTP_INTERCEPTORS, useClass: InterceptorHttpErrorService, multi: true },
             {  provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptorService, multi:true },
                AlertifyService,
                {
                  provide: RECAPTCHA_V3_SITE_KEY,
                  useValue: environment.reCaptcha.siteKey,
                }],

  bootstrap: [AppComponent]
})
export class AppModule { }
