import { Component, OnInit, signal } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { ApiService } from '../../service/api.service';
import {
  filterOptionsModel,
  filterParams,
  ReportCount,
  ReportsData,
  RepostsCountResponse,
} from '../../models/dash.model';
import { firstValueFrom } from 'rxjs/internal/firstValueFrom';
import { CommonModule } from '@angular/common';
import { AreaOptions, ColumnOptions, PieOptions } from '../../models/chart_options.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.component.html',
  imports: [SharedModule, CommonModule],
})
export class DashboardComponent implements OnInit {
  reportsCountResponse = signal<RepostsCountResponse | null>(null);
  isLoading = signal<boolean>(false);
  static_option: filterOptionsModel = { label: 'Mes', value: 'monthly' };
  InputMonth: number = new Date().getMonth() + 1;
  InputYear: number = new Date().getFullYear();
  InputZone: string = 'Zona hotelera';
  InputAirline: string = 'Todas';
  InputStatus: string = 'Finalizado';
  areaOptions = AreaOptions;
  pieOptions = PieOptions;
  columnOptions = ColumnOptions;
  params: filterParams = {
    filter: this.static_option,
    month: this.InputMonth,
    year: this.InputYear,
    delivery_status: this.InputStatus,
    airline: this.InputAirline,
  };

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.getReportsCount(this.params);
    this.getPieChartData();
    this.getCompletionTimes(this.InputZone);
  }

  async getReportsCount(filterParams: filterParams) {
    this.isLoading.set(true);
    try {
      const response: RepostsCountResponse = await firstValueFrom(
        this.apiService.getReportsCount(
          filterParams.filter.value,
          filterParams.month,
          filterParams.year,
          filterParams.operator_id,
          filterParams.airline,
          filterParams.delivery_status
        )
      );
      // Update the signal with the response
      this.reportsCountResponse.set(response);
      switch (filterParams.filter.value) {
        case 'monthly':
          this.static_option.label = 'Mes';
          this.static_option.value = 'monthly';
          break;
        case 'year':
          this.static_option.label = 'Año';
          this.static_option.value = 'year';
          break;
        case 'all years':
          this.static_option.label = 'Todo';
          this.static_option.value = 'all years';
          break;
        case '15 days':
          this.static_option.label = 'Ultimos 15 días';
          this.static_option.value = '15 days';
          break;
      }
      if (filterParams.filter.value === 'year') {
        // Update the chart options
        const categories = response.reports.map(
          (report) => `${report.month}/${report.year}`
        );
        const data = response.reports.map((report) => report.total_count);
        this.areaOptions = {
          ...this.areaOptions,
          series: [
            {
              name: 'Reports',
              data: data,
            },
          ],
          xaxis: {
            categories: categories,
          },
        };
      } else if (filterParams.filter.value === 'all years') {
        // Update the chart options
        const categories = response.reports.map((report) => `${report.year}`);
        const data = response.reports.map((report) => report.total_count);
        this.areaOptions = {
          ...this.areaOptions,
          series: [
            {
              name: 'Reports',
              data: data,
            },
          ],
          xaxis: {
            categories: categories,
          },
        };
      } else {
        // Update the chart options
        const categories = response.reports.map(
          (report) => ` ${report.day}/${report.month}/${report.year}`
        );
        const data = response.reports.map((report) => report.total_count);
        this.areaOptions = {
          ...this.areaOptions,
          series: [
            {
              name: 'Reportes',
              data: data,
            },
          ],
          xaxis: {
            categories: categories,
          },
        };
      }
    } catch (error) {
      alert('No hay datos para ese filtro en específico.');
    } finally {
      this.isLoading.set(false); // Set loading to false
    }
  }

  async getPieChartData() {
    this.isLoading.set(true);
    try {
      const response = await firstValueFrom(
        this.apiService.getReportsPercentage()
      );
      const series = response.statuses.map((statute) => statute.percentage);
      const labels = response.statuses.map((statute) => statute.status);
      const colors = response.statuses.map((statuses) =>
        this.getColor(statuses.status)
      );

      this.pieOptions = {
        ...this.pieOptions,
        series: series,
        labels: labels,
        colors: colors,
      };
    } catch (error) {
      alert('No hay datos para ese filtro en específico.');
    } finally {
      this.isLoading.set(false);
    }
  }

  async getCompletionTimes(delivery_zone: string) {
    this.isLoading.update(() => true);
    try {
      const response = await firstValueFrom(
        this.apiService.getCompletionTimes(delivery_zone)
      );
      this.columnOptions = {
        ...this.columnOptions,
        series: [
          {
            name: 'Tiempo promedio',
            data: response.completion_times.map((data) => ({
              x: data.destination,
              y: data.average_time,
            })),
          },
        ],
      };
    } catch (error) {
      alert('No hay datos para ese filtro en específico.');
    } finally {
      this.isLoading.update(() => false);
    }
  }

  getColor(cell: string): string {
    switch (cell) {
      case 'Facturado':
        return '#1C64F2';
      case 'Activo':
        return '#16BDCA';
      case 'Pendiente':
        return '#FBBF24';
      case 'Finalizado':
        return '#4CAF50';
      default:
        return '#000000';
    }
  }

  onOptionSelected(option: filterOptionsModel) {
    this.params.filter = option;
    this.getReportsCount(this.params);
  }

  onUserIdSearch(userId: string) {
    this.params.operator_id = userId;
    this.getReportsCount(this.params);
  }

  onMonthSelected(month: number) {
    this.params.month = month;
    this.InputMonth = month;
    this.getReportsCount(this.params);
  }

  onYearSelected(year: number) {
    this.params.year = year;
    this.InputYear = year;
    this.getReportsCount(this.params);
  }

  onZoneSelected(zone: string) {
    this.InputZone = zone;
    this.getCompletionTimes(zone);
  }

  onClickDownload() {
    const reportsData = this.reportsCountResponse();
    if (!reportsData) {
      console.error('No data available to download.');
      return;
    }

    // Convert reportsData to CSV format
    const csvRows: string[] = [];
    // Assuming reportsData is an array of objects
    const reports = reportsData.reports_data; // Adjust based on your data structure

    if (!reports || reports.length === 0) {
      console.error('No report data to download.');
      return;
    }

    // Get headers
    // TODO : Adjust based on your data structure
    const headers: Array<keyof ReportsData> = [
      'delivery_date',
      'creation_date',
      'bdo_number',
      'airline',
      'delivery_status',
      'destination',
    ];
    csvRows.push(headers.join(','));

    // Add data rows
    for (const report of reports) {
      const values = headers.map((header) => {
        const val = report[header];

        if (typeof val === 'string') {
          return `"${val.replace(/"/g, '""')}"`;
        } else if (val === null || val === undefined) {
          return '';
        } else {
          return val;
        }
      });
      csvRows.push(values.join(','));
    }

    const csvContent = csvRows.join('\n');

    // Create a Blob with CSV content
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);

    // Get today's date and format it as YYYY-MM-DD
    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0]; // YYYY-MM-DD format

    // Create a link to trigger download
    const link = document.createElement('a');
    link.href = url;
    link.download = `reportsData_${formattedDate}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  onAirlineSelected(airline: string) {
    this.params.airline = airline;
    this.InputAirline = airline;
    this.getReportsCount(this.params);
  }

  onStatusSelected(status: string) {
    this.params.delivery_status = status;
    this.InputStatus = status;
    this.getReportsCount(this.params);
  }
}
