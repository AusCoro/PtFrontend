import { Component } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../service/api.service';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  imports: [FormsModule, CommonModule],
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(
    private apiService: ApiService,
    private authService: AuthService,
    private router: Router
  ) {}

  login() {
    this.apiService.login(this.username, this.password).subscribe({
      next: (response) => {
        // Guarda el token usando AuthService
        this.authService.setToken(response.token);
        this.authService.setRole(response.role);

        // Redirige a la página principal o protegida
        this.router.navigate(['/']);
      },
      error: (error) => {
        console.error('Login failed:', error);
        if (error.status === 0) {
          this.errorMessage = 'No se pudo conectar con el servidor. Por favor, inténtelo de nuevo más tarde.';
        } else {
          this.errorMessage = 'Credenciales incorrectas';
        }
      },
    });
  }
}
