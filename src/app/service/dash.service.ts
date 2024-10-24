import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { RepostsCountResponse, StatutesPercentResponse } from '../models/dash.model';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root',
})
export class DashService {
  private apiUrl = 'http://localhost:8000';

  constructor(private http: HttpClient, private authService: AuthService) {}

  // Método GET para obtener los conteos de reportes
  getReportsCount(
    filter: string,
    month?: number,
    year?: number,
    operator_id?: string
  ): Observable<RepostsCountResponse> {
    const params: any = { filter };
    if (month !== undefined) params.month = month;
    if (year !== undefined) params.year = year;
    if (operator_id !== undefined) params.operator_id = operator_id;

    return this.http.get<RepostsCountResponse>(`${this.apiUrl}/dash/`, {
      params,
      headers: {
        Authorization: `Bearer ${this.authService.getToken()}`,
      },
    });
  }

  // Método GET para obtener el porcentaje de reportes
  getReportsPercentage(): Observable<StatutesPercentResponse> {
    return this.http.get<StatutesPercentResponse>(
      `${this.apiUrl}/dash/status-percentages/`,
      {
        headers: {
          Authorization: `Bearer ${this.authService.getToken()}`,
        },
      }
    );
  }
}
