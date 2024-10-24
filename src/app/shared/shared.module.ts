import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TableComponent } from './table/table.component';
import { AddButtonComponent } from './add-button/add-button.component';
import { ModalComponent } from './modal/modal.component';
import { TitleComponent } from './title/title.component';
import { ChartComponent } from './chart/chart.component';
import { PieChartComponent } from './pie-chart/pie-chart.component';

@NgModule({
  declarations: [
    TableComponent,
    AddButtonComponent,
    ModalComponent,
    TitleComponent,
    ChartComponent,
    PieChartComponent
  ],
  imports: [CommonModule, FormsModule],
  exports: [TableComponent, AddButtonComponent, ModalComponent, TitleComponent, ChartComponent, PieChartComponent],
})
export class SharedModule {}
