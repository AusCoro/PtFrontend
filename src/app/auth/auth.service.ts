import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private tokenKey = 'token'; // Nombre de la clave para almacenar el token en localStorage

  constructor() {}

  // Guarda el token en el localStorage
  setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  setRole(role: string): void {
    localStorage.setItem('role', role);
  }

  getRole(): string | null {
    return localStorage.getItem('role');
  }

  // Obtiene el token del localStorage
  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  // Verifica si el usuario está autenticado (si hay un token válido en localStorage)
  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  // Cierra sesión eliminando el token
  logout(): void {
    localStorage.removeItem(this.tokenKey);
  }
}
