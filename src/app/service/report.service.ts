import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root',
})
export class ReportService {
  private apiUrl = environment.apiUrl; // La URL de tu API

  constructor(private http: HttpClient, private authService: AuthService) {}

  // Método GET para obtener todos los reportes
  getReports(): Observable<any> {
    const url = `${this.apiUrl}/reports/`;
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.get(url, { headers });
  }

  // Método POST para crear un nuevo reporte
  createReport(report: any): Observable<any> {
    const url = `${this.apiUrl}/reports/`;
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
    return this.http.post(url, report, { headers });
  }

  // Método PUT para actualizar status del reporte
  updateReportStatus(reportId: string, status: string): Observable<any> {
    const url = `${this.apiUrl}/reports/?report_id=${reportId}&delivery_status=${status}`;
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
    return this.http.put(url, {}, { headers });
  }

}
