import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';


@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:8000'; // La URL de tu API

  constructor(private http: HttpClient, private authService: AuthService) {}

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

  // Método GET para obtener todos los usuarios
  getUsers(): Observable<any> {
    const url = `${this.apiUrl}/users/all`;
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.get(url, { headers });
  }

  // Método POST para crear un nuevo usuario
  createUser(user: any): Observable<any> {
    const url = `${this.apiUrl}/users/`;
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
    return this.http.post(url, user, { headers });
  }
}
