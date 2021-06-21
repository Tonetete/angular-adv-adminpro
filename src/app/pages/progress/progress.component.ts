import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['progress.component.scss'],
})
export class ProgressComponent implements OnInit {
  progress1: number = 25;
  progress2: number = 35;

  ngOnInit(): void {}

  get getProgress1() {
    return `${this.progress1}%`;
  }

  get getProgress2() {
    return `${this.progress2}%`;
  }
}
