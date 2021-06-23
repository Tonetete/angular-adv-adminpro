import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promises',
  templateUrl: './promises.component.html',
  styles: [],
})
export class PromisesComponent implements OnInit {
  constructor() {}

  async ngOnInit() {
    const result = await this.getUsers();
    console.log(result);

    // const promise = new Promise((resolve, reject) => {
    //   resolve('Hola Mundo');
    // });

    // promise.then((msg) => {
    //   console.log(msg);
    // });

    // console.log('Fin del init');
  }

  async getUsers() {
    return new Promise((resolve, reject) => {
      fetch('https://reqres.in/api/users').then(async (response) =>
        resolve(await response.json())
      );
    });
  }
}
