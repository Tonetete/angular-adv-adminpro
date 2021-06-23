import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-increment',
  templateUrl: './increment.component.html',
  styles: [],
})
export class IncrementComponent implements OnInit {
  @Input('value') progress: number = 40;
  @Input() btnClass: string = 'btn-primary';
  @Output() cbValue: EventEmitter<number> = new EventEmitter();

  max: number = 100;
  min: number = 0;

  constructor() {}

  ngOnInit(): void {
    this.btnClass = `btn ${this.btnClass}`;
  }

  getProgress = () => `${this.progress}%`;

  changeValue(value: number) {
    if (this.progress <= this.min && value <= 0) {
      this.progress = this.min;
    } else if (this.progress >= this.max && value >= 0) {
      this.progress = this.max;
    } else {
      this.progress += value;
    }
    this.cbValue.emit(this.progress);
  }

  onChange(value: number) {
    if (value >= this.max) {
      this.cbValue.emit(this.max);
    } else if (value <= this.min) {
      this.cbValue.emit(this.min);
    } else {
      this.cbValue.emit(value);
    }
  }
}
