import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  // Verifica si el usuario está autenticado para permitir el acceso a la ruta
  canActivate(): boolean {
    if (this.authService.isAuthenticated()) {
      return true; // Usuario autenticado, permite el acceso
    } else {
      this.router.navigate(['/login']); // Redirige al login si no está autenticado
      return false;
    }
  }
}
