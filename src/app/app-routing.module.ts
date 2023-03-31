import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { AppointmentComponent } from './appointment/appointment.component';
import { RegisterComponent } from './register/register.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { PatientComponent } from './patient/patient.component';
import { ChidappointmentComponent } from './patient/chidappointment/chidappointment.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'appointment', component: AppointmentComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'notfound', component: NotfoundComponent },
  { path: 'patient', component: PatientComponent },
  { path: 'patient/chidappointment', component: ChidappointmentComponent },
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
