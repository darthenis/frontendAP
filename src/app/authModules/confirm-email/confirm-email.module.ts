import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmEmailRoutingModule } from './confirm-email-routing.module';
import { ConfirmEmailComponent } from './confirm-email.component';
import { ConfirmEmailService } from 'src/app/services/confirm-email.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { InterceptorHttpErrorService } from 'src/app/services/interceptor-http-error.service';
import { AlertifyService } from 'src/app/services/alertify.service';


@NgModule({
  declarations: [ConfirmEmailComponent],
  imports: [
    CommonModule,
    ConfirmEmailRoutingModule,
    HttpClientModule
  ],
  providers: [ConfirmEmailService]
})
export class ConfirmEmailModule { }
