import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Components

import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DoctorsComponent } from './management/doctors/doctors.component';
import { DoctorComponent } from './management/doctors/doctor.component';
import { Graph1Component } from './graph1/graph1.component';
import { HospitalsComponent } from './management/hospitals/hospitals.component';
import { PagesComponent } from './pages.component';
import { ProfileComponent } from './profile/profile.component';
import { ProgressComponent } from './progress/progress.component';
import { PromisesComponent } from './promises/promises.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { UsersComponent } from './management/users/users.component';

// Guards

import { AuthGuard } from '../guards/auth.guard';
import { SearchComponent } from './search/search.component';
import { AdminGuard } from '../guards/admin.guard';

const routes: Routes = [
  {
    path: 'dashboard',
    component: PagesComponent,
    canActivate: [AuthGuard],
    children: [
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
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
