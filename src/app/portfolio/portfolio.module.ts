import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PortfolioRoutingModule } from './portfolio-routing.module';
import { HeaderComponent } from './components/header/header.component';
import { AboutMeComponent } from './components/about-me/about-me.component';
import { ExperienceComponent } from './components/experience/experience.component';
import { EducationComponent } from './components/education/education.component';
import { SkillsComponent } from './components/skills/skills.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { FooterComponent } from './components/footer/footer.component';
import { EditButtonsComponent } from './components/modules/edit-buttons/edit-buttons.component';
import { ButtonComponent } from './components/modules/button/button.component';
import { AddSectionComponent } from './components/modules/add-section/add-section.component';
import { SkeletonComponent } from './components/about-me/skeleton/skeleton.component';
import { ArrowResumeComponent } from './components/modules/arrow-resume/arrow-resume.component';
import { ContactComponent } from './components/contact/contact.component';
import { SocialNetworksComponent } from './components/social-networks/social-networks.component';
import { MessagesComponent } from './components/messages/messages.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RoundProgressModule } from 'angular-svg-round-progressbar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatDividerModule } from '@angular/material/divider';
import { RecaptchaV3Module, RECAPTCHA_V3_SITE_KEY } from 'ng-recaptcha';
import { UserDataService } from '../services/user-data.service';
import { environment } from 'src/environments/environment';
import { PortfolioComponent } from './portfolio.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { InterceptorJwtService } from '../services/interceptorjwt.service';
import { InterceptorHttpErrorService } from '../services/interceptor-http-error.service';
import { LoadingInterceptorService } from '../services/loading-interceptor.service';
import { DynamicFormModule } from '../components/dynamic-form/dynamic-form.module';


@NgModule({
  declarations: [
    PortfolioComponent,
    HeaderComponent,
    AboutMeComponent,
    ExperienceComponent,
    EducationComponent,
    SkillsComponent,
    ProjectsComponent,
    FooterComponent,
    EditButtonsComponent,
    ButtonComponent,
    AddSectionComponent,
    SkeletonComponent,
    ArrowResumeComponent,
    ContactComponent,
    SocialNetworksComponent,
    MessagesComponent
  ],
  imports: [
    CommonModule,
    PortfolioRoutingModule,
    FontAwesomeModule,
    RoundProgressModule,
    FormsModule,
    ReactiveFormsModule,
    DragDropModule,
    MatDividerModule,
    RecaptchaV3Module,
    HttpClientModule,
    DynamicFormModule
  ],
  providers: [UserDataService,
    {provide: HTTP_INTERCEPTORS, useClass: InterceptorJwtService, multi:true },
    {provide: HTTP_INTERCEPTORS, useClass: InterceptorHttpErrorService, multi: true }, 
    {provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptorService, multi:true},
    {
      provide: RECAPTCHA_V3_SITE_KEY,
      useValue: environment.reCaptcha.siteKey,
    }],
})
export class PortfolioModule { }
