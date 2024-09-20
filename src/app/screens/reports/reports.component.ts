import { Component } from '@angular/core';
import { SharedModule } from "../../shared/shared.module";
import { ReportsInterface } from '../../models/report';

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.scss'
})

export class ReportsComponent {
  reports: ReportsInterface[] = [
    {
      id: '11231231',
      numRef: 1,
      numBDO: 233223,
      create_date: '05/05/2023',
      finish_date: '',
      destination: 'Cancun',
      station: 'A1',
      airline: 'Aeroméxico',
      deliveryZone: 'Hotel',
      status: 'En preogreso'
    },
    {
      id: '2212312',
      numRef: 2,
      numBDO: 233223,
      create_date: '05/05/2023',
      finish_date: '05/05/2023',
      destination: 'Consumel',
      station: 'A1',
      airline: 'Aeroméxico',
      deliveryZone: 'Hotel',
      status: 'Finalizado'
    },
    {
      id: '2212312',
      numRef: 3,
      numBDO: 233223,
      create_date: '05/05/2023',
      finish_date: '',
      destination: 'Yucatan',
      station: 'A1',
      airline: 'Aeroméxico',
      deliveryZone: 'Hotel',
      status: 'Esperando'
    },
    {
      id: '11231231',
      numRef: 1,
      numBDO: 233223,
      create_date: '05/05/2023',
      finish_date: '',
      destination: 'Cancun',
      station: 'A1',
      airline: 'Aeroméxico',
      deliveryZone: 'Hotel',
      status: 'En preogreso'
    },
    {
      id: '2212312',
      numRef: 2,
      numBDO: 233223,
      create_date: '05/05/2023',
      finish_date: '05/05/2023',
      destination: 'Consumel',
      station: 'A1',
      airline: 'Aeroméxico',
      deliveryZone: 'Hotel',
      status: 'Finalizado'
    },
    {
      id: '2212312',
      numRef: 3,
      numBDO: 233223,
      create_date: '05/05/2023',
      finish_date: '',
      destination: 'Yucatan',
      station: 'A1',
      airline: 'Aeroméxico',
      deliveryZone: 'Hotel',
      status: 'Esperando'
    },
    {
      id: '11231231',
      numRef: 1,
      numBDO: 233223,
      create_date: '05/05/2023',
      finish_date: '',
      destination: 'Cancun',
      station: 'A1',
      airline: 'Aeroméxico',
      deliveryZone: 'Hotel',
      status: 'En preogreso'
    },
    {
      id: '2212312',
      numRef: 2,
      numBDO: 233223,
      create_date: '05/05/2023',
      finish_date: '05/05/2023',
      destination: 'Consumel',
      station: 'A1',
      airline: 'Aeroméxico',
      deliveryZone: 'Hotel',
      status: 'Finalizado'
    },
    {
      id: '2212312',
      numRef: 3,
      numBDO: 233223,
      create_date: '05/05/2023',
      finish_date: '',
      destination: 'Yucatan',
      station: 'A1',
      airline: 'Aeroméxico',
      deliveryZone: 'Hotel',
      status: 'Esperando'
    },
    {
      id: '11231231',
      numRef: 1,
      numBDO: 233223,
      create_date: '05/05/2023',
      finish_date: '',
      destination: 'Cancun',
      station: 'A1',
      airline: 'Aeroméxico',
      deliveryZone: 'Hotel',
      status: 'En preogreso'
    },
    {
      id: '2212312',
      numRef: 2,
      numBDO: 233223,
      create_date: '05/05/2023',
      finish_date: '05/05/2023',
      destination: 'Consumel',
      station: 'A1',
      airline: 'Aeroméxico',
      deliveryZone: 'Hotel',
      status: 'Finalizado'
    },
    {
      id: '2212312',
      numRef: 3,
      numBDO: 233223,
      create_date: '05/05/2023',
      finish_date: '',
      destination: 'Yucatan',
      station: 'A1',
      airline: 'Aeroméxico',
      deliveryZone: 'Hotel',
      status: 'Esperando'
    },
  ];

  tableHeaders = ['Num.Ref', 'Num.BDO', 'Fecha de creacion', 'Fecha de finalizacion' ,'Destino', 'Estación', 'Aerolínea', 'Zona de entrega', 'Estatus'];
  
  tableData: any[] = [];
  ngOnInit(): void {
    this.tableData = this.reports.map(report => [
      report.id,
      report.numRef,
      report.numBDO,
      report.create_date,
      report.finish_date ? report.finish_date : 'N/A',
      report.destination,
      report.station,
      report.airline,
      report.deliveryZone,
      report.status
    ]);

  }

  
}
