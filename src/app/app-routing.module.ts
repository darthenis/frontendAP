
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './portfolio/components/not-found/not-found.component';


const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full' },
  {path: 'login', loadChildren: () => import('./authModules/login/login.module').then(m => m.LoginModule)},
  {path: 'user/:username', loadChildren: () => import('./portfolio/portfolio.module').then(m => m.PortfolioModule)},
  {path: 'registration', loadChildren: () => import('./authModules/registration/registration.module').then(m => m.RegistrationModule)},
  {path: 'auth/confirm/:token', loadChildren: () => import('./authModules/confirm-email/confirm-email.module').then(m => m.ConfirmEmailModule)},
  {path: 'auth/recoverypass', loadChildren: () => import('./authModules/recovery-pass/recovery-pass.module').then(m => m.RecoveryPassModule)},
  //page not found
  {path: 'not-found', component : NotFoundComponent},
  {path: '**', component : NotFoundComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
