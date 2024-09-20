import { Component, HostListener } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  constructor(private authService: AuthService, private router: Router) {}

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  toggleSidebar() {
    const sidebar = document.getElementById('logo-sidebar');
    if (sidebar) {
      sidebar.classList.toggle('-translate-x-full');
    }
  }

  closeSidebar() {
    const sidebar = document.getElementById('logo-sidebar');
    if (sidebar && window.innerWidth < 969) {
      sidebar.classList.add('-translate-x-full');
    }
  }

  // Cerrar sidebar si se hace clic fuera del mismo
  @HostListener('document:click', ['$event'])
  onClick(event: Event) {
    const sidebar = document.getElementById('logo-sidebar');
    const toggleButton = document.querySelector(
      '[aria-controls="logo-sidebar"]'
    );

    if (sidebar && toggleButton && window.innerWidth < 640) {
      if (
        !sidebar.contains(event.target as Node) &&
        !toggleButton.contains(event.target as Node)
      ) {
        sidebar.classList.add('-translate-x-full');
      }
    }
  }
}
