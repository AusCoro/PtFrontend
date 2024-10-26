import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { from, Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { environment } from '../../environments/environment';



@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = environment.apiUrl; // La URL de tu API

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

  // Método Put para actualizar el nivel de autorización del usuario
  updateUser(userId: string, newRole: string): Observable<any> {
    const url = `${this.apiUrl}/users/change-role?user_id=${userId}&new_role=${newRole}`;
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });

    return this.http.put(url, {}, { headers });
  }

  // Método Put para actualizar contraseña
  updatePassword(password_request: string, user_id: string): Observable<any> {
    const url = `${this.apiUrl}/users/change-password/${user_id}`;
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    // Crear un objeto FormData y agregar el password_request
    const formData = new FormData();
    formData.append('password_request', password_request);

    return this.http.put(url, formData, { headers });
  }
}
