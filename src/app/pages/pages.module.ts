import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Modules
import { ComponentsModule } from '../components/components.module';
import { SharedModule } from '../shared/shared.module';

// Components

import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Graph1Component } from './graph1/graph1.component';
import { PagesComponent } from './pages.component';
import { ProgressComponent } from './progress/progress.component';
import { RouterModule } from '@angular/router';
import { PromisesComponent } from './promises/promises.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { ProfileComponent } from './profile/profile.component';
import { UsersComponent } from './management/users/users.component';

@NgModule({
  declarations: [
    AccountSettingsComponent,
    DashboardComponent,
    Graph1Component,
    ProgressComponent,
    PagesComponent,
    PromisesComponent,
    RxjsComponent,
    ProfileComponent,
    UsersComponent,
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    SharedModule,
  ],
  exports: [
    DashboardComponent,
    Graph1Component,
    ProgressComponent,
    PagesComponent,
    PromisesComponent,
  ],
})
export class PagesModule {}
