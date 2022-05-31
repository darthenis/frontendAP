import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmEmailRoutingModule } from './confirm-email-routing.module';
import { ConfirmEmailComponent } from './confirm-email.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


@NgModule({
  declarations: [ConfirmEmailComponent],
  imports: [
    CommonModule,
    ConfirmEmailRoutingModule,
    HttpClientModule,
    FontAwesomeModule
  ],
  providers: []
})
export class ConfirmEmailModule { }
