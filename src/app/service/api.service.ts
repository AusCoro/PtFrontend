import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { ReportService } from './report.service';
import { DashService } from './dash.service';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(
    private userService: UserService,
    private reportService: ReportService,
    private dashService: DashService
  ) {}

  // Método para el login usando UserService
  login(username: string, password: string): Observable<any> {
    try {
      return this.userService.login(username, password).pipe(
        catchError((error) => {
          console.error('Error en login:', error);
          return throwError(() => new Error('Error en login'));
        })
      );
    } catch (error) {
      console.error('Error en login:', error);
      return throwError(() => new Error('Error en login'));
    }
  }

  // Método para obtener todos los usuarios usando UserService
  getUsers(): Observable<any[]> {
    try {
      return this.userService.getUsers().pipe(
        catchError((error) => {
          console.error('Error al obtener usuarios:', error);
          return throwError(() => new Error('Error al obtener usuarios'));
        })
      );
    } catch (error) {
      console.error('Error al obtener usuarios:', error);
      return throwError(() => new Error('Error al obtener usuarios'));
    }
  }

  // Método para crear un usuario nuevo usando UserService
  createUser(user: any): Observable<any> {
    try {
      return this.userService.createUser(user).pipe(
        catchError((error) => {
          console.error('Error al crear usuario:', error);
          return throwError(() => new Error('Error al crear usuario'));
        })
      );
    } catch (error) {
      console.error('Error al crear usuario:', error);
      return throwError(() => new Error('Error al crear usuario'));
    }
  }

  // Método para obtener todos los reportes usando ReportService
  getReports(): Observable<any[]> {
    try {
      return this.reportService.getReports().pipe(
        catchError((error) => {
          console.error('Error al obtener reportes:', error);
          return throwError(() => new Error('Error al obtener reportes'));
        })
      );
    } catch (error) {
      console.error('Error al obtener reportes:', error);
      return throwError(() => new Error('Error al obtener reportes'));
    }
  }

  // Método para crear un reporte nuevo usando ReportService
  createReport(report: any): Observable<any> {
    try {
      return this.reportService.createReport(report).pipe(
        catchError((error) => {
          console.error('Error al crear reporte:', error);
          return throwError(() => new Error('Error al crear reporte'));
        })
      );
    } catch (error) {
      console.error('Error al crear reporte:', error);
      return throwError(() => new Error('Error al crear reporte'));
    }
  }

  // Método para actualizar el status de un reporte
  updateReportStatus(reportId: string, status: string): Observable<any> {
    try {
      return this.reportService.updateReportStatus(reportId, status).pipe(
        catchError((error) => {
          console.error('Error al actualizar status del reporte:', error);
          return throwError(
            () => new Error('Error al actualizar status del reporte')
          );
        })
      );
    } catch (error) {
      console.error('Error al actualizar status del reporte:', error);
      return throwError(
        () => new Error('Error al actualizar status del reporte')
      );
    }
  }

  // Método para actualizar la contraseña de un usuario
  updatePassword(newPassword: string, userId: string): Observable<any> {
    try {
      return this.userService.updatePassword(newPassword, userId).pipe(
        catchError((error) => {
          console.error('Error al actualizar contraseña:', error);
          return throwError(() => new Error('Error al actualizar contraseña'));
        })
      );
    } catch (error) {
      console.error('Error al actualizar contraseña:', error);
      return throwError(() => new Error('Error al actualizar contraseña'));
    }
  }

  // Método para actualizar el rol de un usuario
  updateAuthorization(userId: string, newRole: string): Observable<any> {
    try {
      return this.userService.updateUser(userId, newRole).pipe(
        catchError((error) => {
          console.error('Error al actualizar rol:', error);
          return throwError(() => new Error('Error al actualizar rol'));
        })
      );
    } catch (error) {
      console.error('Error al actualizar rol:', error);
      return throwError(() => new Error('Error al actualizar rol'));
    }
  }

  getReportsCount(
    filter: string,
    month?: number,
    year?: number,
    operator_id?: string
  ) {
    try {
      return this.dashService
        .getReportsCount(filter, month, year, operator_id)
        .pipe(
          catchError((error) => {
            console.error('Error al obtener conteos de reportes:', error);
            return throwError(
              () => new Error('Error al obtener conteos de reportes')
            );
          })
        );
    } catch (error) {
      console.error('Error al obtener conteos de reportes:', error);
      return throwError(
        () => new Error('Error al obtener conteos de reportes')
      );
    }
  }

  getReportsPercentage() {
    try {
      return this.dashService.getReportsPercentage().pipe(
        catchError((error) => {
          console.error('Error al obtener porcentajes de reportes:', error);
          return throwError(
            () => new Error('Error al obtener porcentajes de reportes')
          );
        })
      );
    } catch (error) {
      console.error('Error al obtener porcentajes de reportes:', error);
      return throwError(
        () => new Error('Error al obtener porcentajes de reportes')
      );
    }
  }

  getCompletionTimes(delivery_zone: string) {
    try {
      return this.dashService.getCompletionTimes(delivery_zone).pipe(
        catchError((error) => {
          console.error('Error al obtener tiempos de entrega:', error);
          return throwError(
            () => new Error('Error al obtener tiempos de entrega')
          );
        })
      );
    } catch (error) {
      console.error('Error al obtener tiempos de entrega:', error);
      return throwError(
        () => new Error('Error al obtener tiempos de entrega')
      );
    }
  }
}
