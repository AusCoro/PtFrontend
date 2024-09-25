import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { ReportsInterface } from '../../models/report';
import { FormsModule } from '@angular/forms';

class reportStatus {
  inProgress: string = 'En progreso';
  finished: string = 'Finalizado';
  waiting: string = 'Esperando';
}

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [SharedModule, CommonModule, FormsModule],
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.scss',
})
export class ReportsComponent {
  showModal: boolean = false;
  reportName: string = '';
  reportDescription: string = '';
  reportDate: string = '';

  ReportStatus = new reportStatus();

  reports: ReportsInterface[] = [
    {
      id: '11',
      numRef: 1,
      numBDO: 233223,
      create_date: '05/05/2023',
      finish_date: '',
      destination: 'Cancun',
      station: 'A1',
      airline: 'Aeroméxico',
      deliveryZone: 'Hotel',
      status: 'En progreso',
    },
    {
      id: '22',
      numRef: 2,
      numBDO: 233223,
      create_date: '05/05/2023',
      finish_date: '05/05/2023',
      destination: 'Consumel',
      station: 'A1',
      airline: 'Aeroméxico',
      deliveryZone: 'Hotel',
      status: 'Finalizado',
    },
    {
      id: '33',
      numRef: 3,
      numBDO: 233223,
      create_date: '05/05/2023',
      finish_date: '',
      destination: 'Yucatan',
      station: 'A1',
      airline: 'Aeroméxico',
      deliveryZone: 'Hotel',
      status: 'Esperando',
    },
  ];

  report: ReportsInterface = {
    id: '',
    numRef: 0,
    numBDO: 0,
    create_date: '',
    finish_date: '',
    destination: '',
    station: '',
    airline: '',
    deliveryZone: '',
    status: this.ReportStatus.waiting,
  };

  tableHeaders = [
    'Num.Ref',
    'Num.BDO',
    'Fecha de creacion',
    'Fecha de finalizacion',
    'Destino',
    'Estación',
    'Aerolínea',
    'Zona de entrega',
    'Estatus',
  ];

  isReportEmpty(report: ReportsInterface): boolean {
    if (report.numRef === 0) {
      return true;
    } else if (report.numBDO === 0) {
      return true;
    } else if (report.destination === '') {
      return true;
    } else if (report.station === '') {
      return true;
    } else if (report.airline === '') {
      return true;
    } else if (report.deliveryZone === '') {
      return true;
    } else {
      return false;
    }
  }

  onSubmit() {
    console.log(this.isReportEmpty(this.report));

    if (this.isReportEmpty(this.report)) {
      console.log(
        'El reporte no ha sido modificado completamente y no se enviará.'
      );
      return;
    }

    console.log(this.report);

    this.report = {
      id: '',
      numRef: 0,
      numBDO: 0,
      create_date: '',
      finish_date: '',
      destination: '',
      station: '',
      airline: '',
      deliveryZone: '',
      status: this.ReportStatus.waiting,
    };
    this.showModal = false;
  }

  tableData: any[] = [];
  ngOnInit(): void {
    this.tableData = this.reports.map((report) => ({
      data: [
        report.numRef,
        report.numBDO,
        report.create_date,
        report.finish_date ? report.finish_date : 'N/A',
        report.destination,
        report.station,
        report.airline,
        report.deliveryZone,
        report.status,
      ],
      id: report.id,
    }));
  }
}
