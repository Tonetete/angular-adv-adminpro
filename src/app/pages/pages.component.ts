import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../services/settings.service';

declare function customInitFunction(): any; // adding typescript for custom.js

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: [],
})
export class PagesComponent implements OnInit {
  defaultTheme: string = '../assets/css/colors/default-dark.css';

  constructor(private settingsService: SettingsService) {}

  ngOnInit(): void {
    customInitFunction(); // calling this jQuery method whenever pages is loaded
  }
}
