import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { CompletionTimesResponse, RepostsCountResponse, StatutesPercentResponse } from '../models/dash.model';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DashService {
  private apiUrl = environment.apiUrl; // La URL de tu API

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

  // Método GET para obtener los tiempos de entrega
  getCompletionTimes(
    delivery_zone: string
  ): Observable<CompletionTimesResponse> {
    return this.http.get<CompletionTimesResponse>(
      `${this.apiUrl}/dash/average-completion-times/`,
      {
        params: { delivery_zone },
        headers: {
          Authorization: `Bearer ${this.authService.getToken()}`,
        },
      }
    );
  }
}
