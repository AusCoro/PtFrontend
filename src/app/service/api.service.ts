import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = 'http://localhost:8000'; // La URL de tu API

  constructor(private http: HttpClient) {}

  // Método POST para el login
  login(username: string, password: string): Observable<any> {
    const url = `${this.apiUrl}/users/login`; // Ruta del endpoint de login en tu API

    // Crear HttpParams con username y password
    const body = new HttpParams()
      .set('username', username)
      .set('password', password);

    // Configurar los headers para enviar datos como form fields
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });

    return this.http.post(url, body.toString(), { headers });
  }
}
