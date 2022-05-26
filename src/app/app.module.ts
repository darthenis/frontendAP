import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NotFoundComponent } from './portfolio/components/not-found/not-found.component';
import { AuthService } from './services/auth.service';
import { InterceptorHttpErrorService } from './services/interceptor-http-error.service';
import { LoadingInterceptorService } from './services/loading-interceptor.service';




@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent
  ],
  imports: [AppRoutingModule, BrowserModule, BrowserAnimationsModule, HttpClientModule],

  providers: [ AuthService ],

  bootstrap: [AppComponent]
})
export class AppModule { }
