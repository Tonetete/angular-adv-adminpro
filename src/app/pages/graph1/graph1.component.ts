import { Component, OnInit } from '@angular/core';
import { Label, MultiDataSet } from 'ng2-charts';
@Component({
  selector: 'app-graph1',
  templateUrl: './graph1.component.html',
  styles: [],
})
export class Graph1Component implements OnInit {
  public labels1: Label[] = [
    'Download Sales',
    'In-Store Sales',
    'Mail-Order Sales',
  ];
  public data1: MultiDataSet = [[350, 450, 100]];

  constructor() {}

  ngOnInit(): void {}
}
