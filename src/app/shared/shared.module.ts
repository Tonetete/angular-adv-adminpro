import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PipesModule } from '../pipes/pipes.module';
import { RouterModule } from '@angular/router';

// Components

import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';

@NgModule({
  declarations: [BreadcrumbsComponent, HeaderComponent, SidebarComponent],
  imports: [CommonModule, FormsModule, PipesModule, RouterModule],
  exports: [
    BreadcrumbsComponent,
    FormsModule,
    HeaderComponent,
    SidebarComponent,
  ],
})
export class SharedModule {}
