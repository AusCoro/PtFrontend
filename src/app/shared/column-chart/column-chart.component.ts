import { isPlatformBrowser } from '@angular/common';
import {
  Component,
  EventEmitter,
  Inject,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  PLATFORM_ID,
  SimpleChanges,
} from '@angular/core';
import { DeliveryZone } from '../../models/delivery-zone.model';

@Component({
  selector: 'app-column-chart',
  templateUrl: './column-chart.component.html',
})
export class ColumnChartComponent implements OnInit, OnDestroy, OnChanges {
  @Input() columnData: any;
  @Input() inputZone: string = 'Zona hotelera';
  @Output() zoneSelected = new EventEmitter<string>();
  private chart: any;

  deliveryZones = DeliveryZone;
  selectedZone: string = this.deliveryZones[0];

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.loadApexCharts();
    }
    this.selectedZone =
      this.deliveryZones.find((zone) => zone === this.inputZone) ||
      this.deliveryZones[0];
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['columnData'] && !changes['columnData'].isFirstChange()) {
      this.updateChart();
    }
  }

  ngOnDestroy(): void {
    if (this.chart) {
      this.chart.destroy();
    }
  }

  async loadApexCharts() {
    const ApexCharts = (await import('apexcharts')).default;
    this.renderChart(ApexCharts, this.columnData);
  }

  renderChart(ApexCharts: any, options?: any) {
    this.chart = new ApexCharts(
      document.querySelector('#column-chart'),
      options
    );
    this.chart.render();
  }

  updateChart() {
    if (this.chart) {
      this.chart.updateOptions(this.columnData);
    }
  }

  trackByFn(index: number, item: string): string {
    return item;
  }

  onZoneChange() {
    this.zoneSelected.emit(this.selectedZone);
  }
}
