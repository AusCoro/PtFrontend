import { Component, Input, OnInit } from '@angular/core';
import { roles } from './roles';
import { UserInterface } from '../../models/users';
import { AuthService } from '../../auth/auth.service';
import { ApiService } from '../../service/api.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
})
export class TableComponent implements OnInit {
  @Input() data: any[] = [];
  @Input() headers: string[] = [];

  filteredData: any[] = [];
  filters: string[] = [];
  showFilters: boolean[] = [];
  showStatusModal: boolean = false;
  showPasswordModal: boolean = false;
  selectedRowId: string | null = null;
  selectedStatus: string = '';
  selectedAuthorization: string = '';
  showAuthorizationModal: boolean = false;
  newPassword: string = '';
  confirmPassword: string = '';
  passwordsDoNotMatch: boolean = false;

  constructor(private authService: AuthService, private apiService: ApiService ) {}

  myUserRole: string | null = this.authService.getRole();

  role = new roles();

  isAuthorized(role: String): boolean {
    return this.myUserRole === role;
  }

  onFilterChange(event: Event, index: number): void {
    const input = event.target as HTMLInputElement;
    this.filters[index] = input.value.toLowerCase();
    this.applyFilters();
  }

  onStatusClick(rowIndex: number) {
    this.selectedRowId = this.filteredData[rowIndex].id;
    this.showStatusModal = true;
  }

  onPasswordClick(rowIndex: number) {
    this.selectedRowId = this.filteredData[rowIndex].id;
    this.showPasswordModal = true;
  }

  onAuthorizationClick(rowIndex: number) {
    this.selectedRowId = this.filteredData[rowIndex].id;
    this.showAuthorizationModal = true;
  }

  applyFilters(): void {
    this.filteredData = this.data.filter((row) => {
      return this.filters.every((filter, index) => {
        if (!filter) {
          return true;
        }
        return row.data[index].toString().toLowerCase().includes(filter);
      });
    });
  }

  // Nueva función para obtener el id seleccionado
  getSelectedRowId(): string | null {
    return this.selectedRowId;
  }

  // Función para manejar la actualización del estado
  onUpdateStatus(): void {
    const id = this.getSelectedRowId();
    if (id !== null) {
      this.apiService.updateReportStatus(id, this.selectedStatus).subscribe();
    } else {
      console.error('ID is null, cannot update status');
    }
    this.selectedStatus = '';
    this.showStatusModal = false;
  }

  // Función para manejar la actualización de la contraseña
  onUpdatePassword() {
    const id = this.getSelectedRowId();
    if (this.newPassword === '' || this.confirmPassword === '') {
      console.error('Contraseñas vacías');
      return;
    } else if (this.newPassword === this.confirmPassword) {
      // Lógica para actualizar la contraseña
      this.apiService.updatePassword(this.newPassword, id!).subscribe();
      this.showPasswordModal = false;
      this.newPassword = '';
      this.confirmPassword = '';
    } else {
      this.passwordsDoNotMatch = true;
      this.newPassword = '';
      this.confirmPassword = '';
    }
  }

  onUpdateAuthorization() {
    const id = this.getSelectedRowId();
    if (this.selectedAuthorization === '') {
      console.error('Rol no seleccionado');
      return;
    } else {
      // Lógica para actualizar el rol
      this.apiService.updateAuthorization(id!, this.selectedAuthorization).subscribe();
      this.showAuthorizationModal = false;
      this.selectedAuthorization = '';
    }
  }

  ngOnInit(): void {
    this.filteredData = [...this.data];
    this.filters = Array(this.headers.length).fill('');
    this.showFilters = Array(this.headers.length).fill(false);
  }
}
