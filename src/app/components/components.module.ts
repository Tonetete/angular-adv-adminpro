import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// Components

import { IncrementComponent } from './increment/increment.component';
import { DoughnutComponent } from './doughnut/doughnut.component';
import { ChartsModule } from 'ng2-charts';
import { ModalImageComponent } from './modal-image/modal-image.component';

@NgModule({
  declarations: [IncrementComponent, DoughnutComponent, ModalImageComponent],
  imports: [ChartsModule, CommonModule, FormsModule],
  exports: [IncrementComponent, DoughnutComponent, ModalImageComponent],
})
export class ComponentsModule {}
