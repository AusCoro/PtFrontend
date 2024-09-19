import { Routes } from '@angular/router';
import { LoginComponent } from './screens/login/login.component';
import { AuthGuard } from './auth.guard';
import { HomeComponent } from './screens/home/home.component';
import { DashboardComponent } from './screens/dashboard/dashboard.component';
import { ReportsComponent } from './screens/reports/reports.component';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: DashboardComponent },
      { path: 'reports', component: ReportsComponent },
    ],
  },
  { path: '**', redirectTo: '' },
];
