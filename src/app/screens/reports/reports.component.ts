import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { ReportsInterface } from '../../models/report';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../service/api.service';
import { firstValueFrom } from 'rxjs';

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
export class ReportsComponent implements OnInit {
  showModal: boolean = false;
  // reportName: string = '';
  // reportDescription: string = '';
  // reportDate: string = '';
  reports: ReportsInterface[] = [];
  tableData: any[] = [];
  loading: boolean = true;

  constructor(private apiService: ApiService) {}

  ReportStatus = new reportStatus();

  new_report: ReportsInterface = {
    reference_number: 0,
    bdo_number: 0,
    airline: '',
    delivery_zone: '',
  };

  tableHeaders = [
    'Num.Ref',
    'Num.BDO',
    'Fecha de creacion',
    'Fecha de finalizacion',
    'Aerolínea',
    'Zona de entrega',
    'Estatus',
  ];

  isReportEmpty(report: ReportsInterface): boolean {
    if (report.reference_number === 0) {
      return true;
    } else if (report.bdo_number === 0) {
      return true;
    } else if (report.airline === '') {
      return true;
    } else if (report.delivery_zone === '') {
      return true;
    } else {
      return false;
    }
  }

  async onSubmit() {

    if (this.isReportEmpty(this.new_report)) {
      console.error(
        'El reporte no ha sido modificado completamente y no se enviará.'
      );
      return;
    } else {
      try {
        const response = await firstValueFrom(this.apiService.createReport(this.new_report));
        this.reports.push(response);
        console.log('Report created:', response);
      } catch (error) {
        console.error('Error creating report:', error);
      } finally {
        this.new_report = {
          reference_number: 0,
          bdo_number: 0,
          airline: '',
          delivery_zone: '',
        };
        this.showModal = false
      }
    }

    console.log(this.new_report);

    this.new_report = {
      reference_number: 0,
      bdo_number: 0,
      airline: '',
      delivery_zone: '',
    };
    this.showModal = false;
  }

  ngOnInit(): void {
    this.loadReports();
  }

  async loadReports() {
    try {
      this.reports = await firstValueFrom(this.apiService.getReports());
      this.tableData = this.reports.map((report) => ({
        data: [
          report.reference_number,
          report.bdo_number,
          report.creation_date,
          report.delivery_date ? report.delivery_date : 'N/A',
          report.airline,
          report.delivery_zone,
          report.delivery_status,
        ],
        id: report.id,
      }));
    } catch (error) {
      console.error('Error loading reports:', error);
    } finally {
      this.loading = false;
    }
  }
}
