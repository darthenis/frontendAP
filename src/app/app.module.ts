import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthService } from './services/auth.service';
import { NotFoundComponent } from './portfolio/components/not-found/not-found.component';
import { LoadingService } from './services/loading.service';
import { AlertifyService } from './services/alertify.service';
import { InterceptorJwtService } from './services/interceptorjwt.service';
import { InterceptorHttpErrorService } from './services/interceptor-http-error.service';
import { LoadingInterceptorService } from './services/loading-interceptor.service';
import { PortfolioModule } from './portfolio/portfolio.module';
import { LoginModule } from './authModules/login/login.module';
import { RegistrationModule } from './authModules/registration/registration.module';
import { ConfirmEmailModule } from './authModules/confirm-email/confirm-email.module';
import { RecoveryPassModule } from './authModules/recovery-pass/recovery-pass.module';
import { UserDataService } from './services/user-data.service';
import { RECAPTCHA_V3_SITE_KEY } from 'ng-recaptcha';
import { environment } from 'src/environments/environment';






@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent
  ],
  imports: [AppRoutingModule, 
            BrowserModule, 
            BrowserAnimationsModule, 
            HttpClientModule, 
            PortfolioModule, 
            LoginModule,
            RegistrationModule,
            ConfirmEmailModule,
            RecoveryPassModule
            ],

  providers: [AuthService, LoadingService, AlertifyService, UserDataService,
    {provide: HTTP_INTERCEPTORS, useClass: InterceptorJwtService, multi:true },
    {provide: HTTP_INTERCEPTORS, useClass: InterceptorHttpErrorService, multi: true }, 
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptorService, multi:true },
    {
      provide: RECAPTCHA_V3_SITE_KEY,
      useValue: environment.reCaptcha.siteKey,
    }],
    

  bootstrap: [AppComponent]
})
export class AppModule { }
