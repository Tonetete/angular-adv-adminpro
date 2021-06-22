import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  private linkTheme = document.querySelector('#theme');
  private linkThemes!: NodeListOf<Element>;
  defaultTheme: string = '../assets/css/colors/default-dark.css';

  constructor() {
    this.setTheme();
  }

  getThemeUrl = (theme: string) => `../../assets/css/colors/${theme}.css`;

  setTheme() {
    const urlTheme = localStorage.getItem('theme') || this.defaultTheme;
    this.linkTheme?.setAttribute('href', urlTheme);
  }

  changeTheme(theme: string) {
    const url = this.getThemeUrl(theme);
    this.linkTheme?.setAttribute('href', url);
    localStorage.setItem('theme', url);
    this.checkCurrentTheme();
  }

  checkCurrentTheme() {
    this.linkThemes = document.querySelectorAll('.selector');
    this.linkThemes?.forEach((elem) => {
      elem.classList.remove('working');
      const btnTheme = elem.getAttribute('data-theme') || 'default';
      const btnThemeUrl = this.getThemeUrl(btnTheme);
      const currentTheme = this.linkTheme?.getAttribute('href');

      if (btnThemeUrl === currentTheme) {
        elem.classList.add('working');
      }
    });
  }
}
