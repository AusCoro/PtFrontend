import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  @Input() data: any[] = [];
  @Input() headers: string[] = [];

  filteredData: any[] = [];
  filters: string[] = [];
  showFilters: boolean[] = [];
  showStatusModal: boolean = false;
  selectedRowId: string | null = null;
  selectedStatus: string = '';

  onFilterChange(event: Event, index: number): void {
    const input = event.target as HTMLInputElement;
    this.filters[index] = input.value.toLowerCase();
    this.applyFilters();
  }

  onStatusClick(rowIndex: number) {
    this.selectedRowId = this.filteredData[rowIndex].id;
    this.showStatusModal = true;
  }

  applyFilters(): void {
    this.filteredData = this.data.filter((row) => {
      return this.filters.every((filter, index) => {
        if (!filter) {
          return true;
        }
        return row.data[index].toString().toLowerCase().includes(filter);
      });
    });
  }

  // Nueva función para obtener el id seleccionado
  getSelectedRowId(): string | null {
    return this.selectedRowId;
  }

  // Función para manejar la actualización del estado
  onUpdateStatus(): void {
    const id = this.getSelectedRowId();
    if (id) {
      console.log(`ID seleccionado: ${id}`);
      console.log(`Estado seleccionado: ${this.selectedStatus}`);
    }
    this.showStatusModal = false;
  }

  ngOnInit(): void {
    this.filteredData = [...this.data];
    this.filters = Array(this.headers.length).fill('');
    this.showFilters = Array(this.headers.length).fill(false);
  }
}
