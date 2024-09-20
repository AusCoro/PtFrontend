import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from './table/table.component';
import { AddButtonComponent } from './add-button/add-button.component';

@NgModule({
  declarations: [TableComponent, AddButtonComponent],
  imports: [
    CommonModule
  ],
  exports: [TableComponent, AddButtonComponent]
})
export class SharedModule { }
