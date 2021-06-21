import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// Components

import { IncrementComponent } from './increment/increment.component';
import { DoughnutComponent } from './doughnut/doughnut.component';
import { ChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [IncrementComponent, DoughnutComponent],
  imports: [ChartsModule, CommonModule, FormsModule],
  exports: [IncrementComponent, DoughnutComponent],
})
export class ComponentsModule {}
