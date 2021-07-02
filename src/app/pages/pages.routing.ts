import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Components

import { PagesComponent } from './pages.component';

// Guards

import { AuthGuard } from '../guards/auth.guard';
import { SearchComponent } from './search/search.component';
import { AdminGuard } from '../guards/admin.guard';

const routes: Routes = [
  {
    path: 'dashboard',
    component: PagesComponent,
    canActivate: [AuthGuard],
    canLoad: [AuthGuard],
    loadChildren: () =>
      import('./child-routes.module').then(
        (module) => module.ChildRoutesModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
