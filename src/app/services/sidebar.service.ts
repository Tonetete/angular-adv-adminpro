import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SidebarService {
  menu: any[] = [
    {
      title: 'Dashboard',
      icon: 'mdi mdi-gauge',
      submenu: [
        {
          title: 'Main',
          url: '/',
        },
        {
          title: 'Graphs',
          url: 'graph1',
        },
        {
          title: 'ProgressBar',
          url: 'progress',
        },
        {
          title: 'Promises',
          url: 'promises',
        },
        {
          title: 'RxJS',
          url: 'rxjs',
        },
      ],
    },
    {
      title: 'Management',
      icon: 'mdi mdi-folder-lock-open',
      submenu: [
        {
          title: 'Doctors',
          url: 'doctors',
        },
        {
          title: 'Hospitals',
          url: 'hospitals',
        },
        {
          title: 'Users',
          url: 'users',
        },
      ],
    },
  ];

  constructor() {}
}
