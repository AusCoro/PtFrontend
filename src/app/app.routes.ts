import { Routes } from '@angular/router';
import { LoginComponent } from './screens/login/login.component';
import { AuthGuard } from './auth/auth.guard';
import { HomeComponent } from './screens/home/home.component';
import { DashboardComponent } from './screens/dashboard/dashboard.component';
import { ReportsComponent } from './screens/reports/reports.component';
import { UsersComponent } from './screens/users/users.component';
import { AdminGuard } from './auth/admin.guard';
import { SupervisorGuard } from './auth/supervisor.guard';

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
      { path: 'dashboard', component: DashboardComponent, canActivate: [AdminGuard] },
      { path: '', component: ReportsComponent },
      { path: 'users', component: UsersComponent, canActivate: [SupervisorGuard] },
    ],
  },
  { path: '**', redirectTo: '' },
];
