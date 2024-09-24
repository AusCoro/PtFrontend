import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TableComponent } from './table/table.component';
import { AddButtonComponent } from './add-button/add-button.component';
import { ModalComponent } from './modal/modal.component';
import { TitleComponent } from './title/title.component';

@NgModule({
  declarations: [
    TableComponent,
    AddButtonComponent,
    ModalComponent,
    TitleComponent,
  ],
  imports: [CommonModule, FormsModule],
  exports: [TableComponent, AddButtonComponent, ModalComponent, TitleComponent],
})
export class SharedModule {}
