import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

// Modules
import { AppRoutingModule } from './app-routing.module';
import { AuthModule } from './auth/auth.module';
import { PagesModule } from './pages/pages.module';

import { AppComponent } from './app.component';
import { NotPageFoundComponent } from './not-page-found/not-page-found.component';

@NgModule({
  declarations: [AppComponent, NotPageFoundComponent],
  imports: [BrowserModule, AppRoutingModule, AuthModule, PagesModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
