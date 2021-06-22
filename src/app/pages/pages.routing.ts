import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Components

import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Graph1Component } from './graph1/graph1.component';
import { PagesComponent } from './pages.component';
import { ProgressComponent } from './progress/progress.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: PagesComponent,
    children: [
      {
        path: '',
        component: DashboardComponent,
      },
      {
        path: 'account-settings',
        component: AccountSettingsComponent,
      },
      {
        path: 'progress',
        component: ProgressComponent,
      },
      {
        path: 'graph1',
        component: Graph1Component,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
