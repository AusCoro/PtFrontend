import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { ReportsInterface } from '../../models/report';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../../service/api.service';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { DeliveryZone } from '../../models/delivery-zone.model';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { Observable } from 'rxjs/internal/Observable';
import { map, startWith } from 'rxjs';
import { AirlinesList } from '../../models/airlines.model';
import { DestinationsList } from '../../models/desitinations.model';

class reportStatus {
  inProgress: string = 'En progreso';
  finished: string = 'Finalizado';
  waiting: string = 'Esperando';
}

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [
    SharedModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatAutocompleteModule,
  ],
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.scss',
})
export class ReportsComponent implements OnInit {
  showModal: boolean = false;
  reports: ReportsInterface[] = [];
  tableData = signal<any[]>([]);
  loading: boolean = true;
  deliveryZones = DeliveryZone;

  destinationControl = new FormControl();
  options: string[] = DestinationsList;
  filteredOptions!: Observable<string[]>;

  airlineControl = new FormControl();
  airlineOptions: string[] = AirlinesList;
  filteredAirlineOptions!: Observable<string[]>;

  constructor(private apiService: ApiService) {}

  ReportStatus = new reportStatus();

  new_report: ReportsInterface = {
    reference_number: 0,
    bdo_number: 0,
    airline: '',
    destination: '',
    delivery_zone: '',
  };

  tableHeaders = [
    'Num.Ref',
    'Num.BDO',
    'Fecha de creacion',
    'Fecha de finalizacion',
    'Aerolínea',
    'Destino',
    'Zona de entrega',
    'Estatus',
  ];

  ngOnInit(): void {
    this.loadReports();
    this.filteredOptions = this.destinationControl.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value || '', this.options))
    );

    this.filteredAirlineOptions = this.airlineControl.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value || '', this.airlineOptions))
    );
  }

  private _filter(value: string, options: string[]): string[] {
    const filterValue = value.toLowerCase();
    return options.filter((option) =>
      option.toLowerCase().includes(filterValue)
    );
  }

  isReportEmpty(report: ReportsInterface): boolean {
    if (report.reference_number === 0) {
      return true;
    } else if (report.bdo_number === 0) {
      return true;
    } else if (report.airline === '') {
      return true;
    } else if (report.delivery_zone === '') {
      return true;
    } else if (report.destination === '') {
      return true;
    } else {
      return false;
    }
  }

  formatDate(date: string | Date): string {
    return format(new Date(date), 'dd/MMM/yyyy HH:mm', { locale: es });
  }

  async onSubmit() {
    if (this.isReportEmpty(this.new_report)) {
      console.error(
        'El reporte no ha sido modificado completamente y no se enviará.'
      );
      return;
    } else {
      this.apiService.createReport(this.new_report).subscribe({
        next: (response) => {
          this.tableData.update((current: any[]) => {
            current.push({
              data: [
                response.reference_number,
                response.bdo_number,
                response.creation_date
                  ? this.formatDate(response.creation_date)
                  : 'N/A',
                response.delivery_date
                  ? this.formatDate(response.delivery_date)
                  : 'N/A',
                response.airline,
                response.destination,
                response.delivery_zone,
                response.delivery_status,
              ],
              id: response.id,
            });
            return current;
          });
          this.loading = true;
        },
        error: (error) => {
          console.error('Error creating report:', error);
        },
        complete: () => {
          this.onCancel();
          setTimeout(() => {
            this.loading = false;
          }, 100);
        },
      });
    }
  }

  onCancel() {
    this.new_report = {
      reference_number: 0,
      bdo_number: 0,
      airline: '',
      destination: '',
      delivery_zone: '',
    };
    this.showModal = false;
  }

  async loadReports() {
    this.apiService.getReports().subscribe({
      next: (reports) => {
        this.tableData.set(
          reports.map((report) => ({
            data: [
              report.reference_number,
              report.bdo_number,
              report.creation_date
                ? this.formatDate(report.creation_date)
                : 'N/A',
              report.delivery_date
                ? this.formatDate(report.delivery_date)
                : 'N/A',
              report.airline,
              report.destination,
              report.delivery_zone,
              report.delivery_status,
            ],
            id: report.id,
          }))
        );
      },
      error: (error) => {
        console.error('Error loading reports:', error);
      },
      complete: () => {
        this.loading = false;
      },
    });
  }
}
