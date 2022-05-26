import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecoveryPassRoutingModule } from './recovery-pass-routing.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RecoveryPassComponent } from './recovery-pass.component';
import { CodeInputModule } from 'angular-code-input';
import { FormsModule } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { InterceptorHttpErrorService } from 'src/app/services/interceptor-http-error.service';
import { LoadingInterceptorService } from 'src/app/services/loading-interceptor.service';
import { AlertifyService } from 'src/app/services/alertify.service';
import { LoadingService } from 'src/app/services/loading.service';


@NgModule({
  declarations: [RecoveryPassComponent],
  imports: [
    CommonModule,
    RecoveryPassRoutingModule,
    FontAwesomeModule,
    CodeInputModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [AuthService, AlertifyService, LoadingService]
})
export class RecoveryPassModule { }
