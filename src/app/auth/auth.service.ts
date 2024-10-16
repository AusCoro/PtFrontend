import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private tokenKey = 'token'; // Nombre de la clave para almacenar el token en localStorage

  constructor() {}

  // Guarda el token en el localStorage
  setToken(token: string): void {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(this.tokenKey, token);
    } else {
      console.error('localStorage is not available');
    }
  }

  setRole(role: string): void {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('role', role);
    } else {
      console.error('localStorage is not available');
    }
  }

  getRole(): string | null {
    if (typeof localStorage !== 'undefined') {
      return localStorage.getItem('role');
    } else {
      console.error('localStorage is not available');
      return null;
    }
  }

  // Obtiene el token del localStorage
  getToken() {
    if (typeof localStorage !== 'undefined') {
      return localStorage.getItem(this.tokenKey);
    } else {
      console.error('localStorage is not available');
      return null;
    }
  }

  // Verifica si el usuario está autenticado (si hay un token válido en localStorage)
  isAuthenticated() {
    const token = this.getToken();
    return !!token;
  }

  // Cierra sesión eliminando el token
  logout(): void {
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem(this.tokenKey);
      localStorage.removeItem('role');
    } else {
      console.error('localStorage is not available');
    }
  }
}
