import {
  Component,
  Input,
  OnInit,
  Inject,
  PLATFORM_ID,
  EventEmitter,
  Output,
  OnDestroy,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { filterOptionsModel } from '../../models/dash.model';
import { BdoStatus } from '../../models/bdo_status.model';
import { AirlinesList } from '../../models/airlines.model';

@Component({
  selector: 'app-chart',
  templateUrl: 'chart.component.html',
  styleUrls: ['chart.components.scss'],
})
export class ChartComponent implements OnInit, OnDestroy {
  @Input() options: any;
  @Input() input_option: filterOptionsModel = {
    label: 'Mes',
    value: 'monthly',
  };
  @Input() InputMonth: number = 0;
  @Input() InputYear: number = 0;
  @Input() InputStatus: string = '';
  @Input() InputAirline: string = '';
  @Output() optionSelected = new EventEmitter<filterOptionsModel>();
  @Output() userIdSearch = new EventEmitter<string>();
  @Output() monthSelected = new EventEmitter<number>();
  @Output() yearSelected = new EventEmitter<number>();
  @Output() clickDownload = new EventEmitter<void>();
  @Output() statusSelected = new EventEmitter<string>();
  @Output() airlineSelected = new EventEmitter<string>();

  isDropdownOpen = false;
  isUserIdInputVisible = false;
  loading: boolean = false;
  userId: string = '';

  months = [
    { name: 'Enero', value: 1 },
    { name: 'Febrero', value: 2 },
    { name: 'Marzo', value: 3 },
    { name: 'Abril', value: 4 },
    { name: 'Mayo', value: 5 },
    { name: 'Junio', value: 6 },
    { name: 'Julio', value: 7 },
    { name: 'Agosto', value: 8 },
    { name: 'Septiembre', value: 9 },
    { name: 'Octubre', value: 10 },
    { name: 'Noviembre', value: 11 },
    { name: 'Diciembre', value: 12 },
  ];

  filter_options: filterOptionsModel[] = [
    { label: '15 dias', value: '15 days' },
    { label: 'Mes', value: 'monthly' },
    { label: 'Año', value: 'year' },
    { label: 'Todo', value: 'all years' },
  ];

  years: number[] = Array.from(
    { length: 30 },
    (_, i) => new Date().getFullYear() - i
  );

  statu_lists: string[] = BdoStatus;
  airlines: string[] = AirlinesList;

  selectedMonth: number = new Date().getMonth() + 1;
  selectedYear: number = new Date().getFullYear();
  actual_option: filterOptionsModel = this.input_option;
  selectedStatus: string = this.InputStatus;
  selectedAirline: string = this.InputAirline;

  private chart: any;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.loadApexCharts();
    }
    this.actual_option =
      this.filter_options.find(
        (option) => option.value === this.input_option.value
      ) || this.filter_options[0];

    // Inicializa el mes y año seleccionados si se proporcionan como @Input
    this.selectedMonth = this.InputMonth || new Date().getMonth() + 1;
    this.selectedYear = this.InputYear || new Date().getFullYear();
    this.selectedStatus = this.InputStatus || 'Finalizado';
    this.selectedAirline = this.InputAirline || 'Todas';
  }

  ngOnDestroy(): void {
    if (this.chart) {
      this.chart.destroy();
    }
  }

  trackByFn(index: number, item: filterOptionsModel): string {
    return item.value;
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  toggleUserIdInput() {
    this.isUserIdInputVisible = !this.isUserIdInputVisible;
  }

  selectOption() {
    this.optionSelected.emit(this.actual_option);
  }

  searchByUserId() {
    this.userIdSearch.emit(this.userId);
    this.isUserIdInputVisible = false;
  }

  onMonthChange() {
    this.monthSelected.emit(this.selectedMonth);
  }

  onYearChange() {
    this.yearSelected.emit(this.selectedYear);
  }

  onClickPrint() {
    this.clickDownload.emit();
  }

  onStatusChange() {
    this.statusSelected.emit(this.selectedStatus);
  }

  onAirlineChange() {
    this.airlineSelected.emit(this.selectedAirline);
  }

  async loadApexCharts() {
    const ApexCharts = (await import('apexcharts')).default;
    this.renderChart(ApexCharts, this.options);
  }

  renderChart(ApexCharts: any, options?: any) {
    this.chart = new ApexCharts(document.querySelector('#area-chart'), options);
    this.chart.render();
  }
}
