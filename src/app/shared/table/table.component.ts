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

  ngOnInit(): void {
    this.filteredData = [...this.data];
    this.filters = Array(this.headers.length).fill('');
  }

  onFilterChange(event: Event, index: number): void {
    const input = event.target as HTMLInputElement;
    this.filters[index] = input.value.toLowerCase();
    this.applyFilters();
  }

  applyFilters(): void {
    this.filteredData = this.data.filter(row => 
      row.every((cell: string, index: number) =>
        cell.toLowerCase().includes(this.filters[index])
      )
    );
  }
}
