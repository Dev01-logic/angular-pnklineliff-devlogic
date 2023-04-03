import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AppointmentComponent } from './appointment/appointment.component';
import { RegisterComponent } from './register/register.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { PatientComponent } from './patient/patient.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  //{ path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  //{ path: 'login', component: LoginComponent },
  {
    path: 'appointment',
    component: AppointmentComponent,
    canActivate: [AuthGuard],
  },
  { path: 'register', component: RegisterComponent, canActivate: [AuthGuard] },
  { path: 'notfound', component: NotfoundComponent, canActivate: [AuthGuard] },
  { path: '', component: PatientComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://angular.io/license
*/
