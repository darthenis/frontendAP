import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecoveryPassComponent } from './recovery-pass.component';

const routes: Routes = [
  {path: '', component: RecoveryPassComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecoveryPassRoutingModule { }
