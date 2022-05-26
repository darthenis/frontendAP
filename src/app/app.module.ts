import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthService } from './services/auth.service';
import { NotFoundComponent } from './portfolio/components/not-found/not-found.component';
import { InterceptorHttpErrorService } from './services/interceptor-http-error.service';
import { LoadingInterceptorService } from './services/loading-interceptor.service';
import { LoadingService } from './services/loading.service';
import { AlertifyService } from './services/alertify.service';





@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent
  ],
  imports: [AppRoutingModule, BrowserModule, BrowserAnimationsModule, HttpClientModule],

  providers: [AuthService, LoadingService, AlertifyService, 
    {provide: HTTP_INTERCEPTORS, useClass: InterceptorHttpErrorService, multi: true }, 
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptorService, multi:true }],

  bootstrap: [AppComponent]
})
export class AppModule { }
