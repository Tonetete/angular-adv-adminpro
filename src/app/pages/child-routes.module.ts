import { NgModule } from '@angular/core';

import { AdminGuard } from '../guards/admin.guard';

import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DoctorsComponent } from './management/doctors/doctors.component';
import { DoctorComponent } from './management/doctors/doctor.component';
import { Graph1Component } from './graph1/graph1.component';
import { HospitalsComponent } from './management/hospitals/hospitals.component';
import { ProfileComponent } from './profile/profile.component';
import { ProgressComponent } from './progress/progress.component';
import { PromisesComponent } from './promises/promises.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { UsersComponent } from './management/users/users.component';
import { RouterModule, Routes } from '@angular/router';
import { SearchComponent } from './search/search.component';

const childRoutes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    data: { title: 'Dashboard' },
  },
  {
    path: 'account-settings',
    component: AccountSettingsComponent,
    data: { title: 'Account Settings' },
  },
  {
    path: 'graph1',
    component: Graph1Component,
    data: { title: 'Graphics 1' },
  },
  {
    path: 'progress',
    component: ProgressComponent,
    data: { title: 'Progress' },
  },
  {
    path: 'profile',
    component: ProfileComponent,
    data: { title: 'User Profile' },
  },
  {
    path: 'promises',
    component: PromisesComponent,
    data: { title: 'Promises' },
  },
  {
    path: 'rxjs',
    component: RxjsComponent,
    data: { title: 'RxJS ' },
  },
  {
    path: 'search/:terms',
    component: SearchComponent,
    data: { title: 'Search' },
  },

  // Management
  {
    path: 'users',
    canActivate: [AdminGuard],
    component: UsersComponent,
    data: { title: 'Users Management' },
  },
  {
    path: 'hospitals',
    component: HospitalsComponent,
    data: { title: 'Hospitals Management' },
  },
  {
    path: 'doctors',
    component: DoctorsComponent,
    data: { title: 'Doctors Management' },
  },
  {
    path: 'doctor/:id',
    canActivate: [AdminGuard],
    component: DoctorComponent,
    data: { title: 'Doctor Management' },
  },
];

@NgModule({
  imports: [RouterModule.forChild(childRoutes)],
  exports: [RouterModule],
})
export class ChildRoutesModule {}
