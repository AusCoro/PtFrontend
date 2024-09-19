import { Component } from '@angular/core';
import { SharedModule } from "../../shared/shared.module";

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.scss'
})

export class ReportsComponent {
  tableHeaders = ['Nombre', 'Edad', 'Ciudad', 'Status'];
  tableData = [  
    ['Juan', 25, 'Madrid'],
    ['Ana', 30, 'Barcelona'],
    ['Luis', 22, 'Valencia']
  ];
}
