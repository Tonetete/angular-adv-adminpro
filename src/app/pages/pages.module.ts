import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

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

@NgModule({
  declarations: [
    AccountSettingsComponent,
    DashboardComponent,
    Graph1Component,
    ProgressComponent,
    PagesComponent,
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    FormsModule,
    RouterModule,
    SharedModule,
  ],
  exports: [
    DashboardComponent,
    Graph1Component,
    ProgressComponent,
    PagesComponent,
  ],
})
export class PagesModule {}
