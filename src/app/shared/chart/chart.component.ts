import { Component, Input, OnInit, Inject, PLATFORM_ID  } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-chart',
  templateUrl: 'chart.component.html',
})
export class ChartComponent implements OnInit {
  @Input() options: any;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.loadApexCharts();
    }
  }

  async loadApexCharts() {
    const ApexCharts = (await import('apexcharts')).default;
    this.renderChart(ApexCharts, this.options);
  }

  renderChart(ApexCharts: any, options?: any) {
    const chart = new ApexCharts(document.querySelector("#area-chart"), options);
    chart.render();
  }

 }
