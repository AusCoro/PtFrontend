import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, Input, OnInit, OnDestroy, PLATFORM_ID, SimpleChanges, OnChanges } from '@angular/core';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
})
export class PieChartComponent implements OnInit, OnDestroy, OnChanges {
  @Input() pieData: any;
  private chart: any;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.loadApexCharts();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['pieData'] && !changes['pieData'].isFirstChange()) {
      this.updateChart();
    }
  }

  async loadApexCharts() {
    const ApexCharts = (await import('apexcharts')).default;
    this.renderChart(ApexCharts, this.pieData);
  }

  renderChart(ApexCharts: any, options?: any) {
    this.chart = new ApexCharts(document.querySelector('#pie-chart'), options);
    this.chart.render();
  }

  updateChart() {
    if (this.chart) {
      this.chart.updateOptions(this.pieData);
    }
  }

  ngOnDestroy(): void {
    if (this.chart) {
      this.chart.destroy();
    }
  }
}
