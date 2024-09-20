import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  @Input() data: any[] = [];
  @Input() headers: string[] = [];

  filteredData: any[] = [];
  filters: string[] = [];
  showFilters: boolean[] = [];
  showStatusModal: boolean = false;

  onFilterChange(event: Event, index: number): void {
    const input = event.target as HTMLInputElement;
    this.filters[index] = input.value.toLowerCase();
    this.applyFilters();
  }

  onStatusClick(rowIndex: number) {
    this.showStatusModal = true;
  }

  applyFilters(): void {
    this.filteredData = this.data.filter(row => {
      return this.filters.every((filter, index) => {
        if (!filter) {
          return true;
        }
        return row[index].toString().toLowerCase().includes(filter);
      });
    });
  }

  ngOnInit(): void {
    this.filteredData = [...this.data];
    this.filters = Array(this.headers.length).fill('');
    this.showFilters = Array(this.headers.length).fill(false);
  }
}
