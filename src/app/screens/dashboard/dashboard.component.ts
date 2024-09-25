import { Component } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.component.html',
  imports: [SharedModule]
})
export class DashboardComponent {

  options = {
    chart: {
      type: 'area',
      height: 350,
    },
    series: [{
      name: 'Users',
      data: [31, 40, 28, 51, 42, 109, 100]
    }],
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul']
    }
  };

}