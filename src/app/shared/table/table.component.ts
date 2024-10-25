import { Component, Input, OnInit, OnDestroy, Output, signal } from '@angular/core';
import { roles } from './roles';
import { format } from 'date-fns';
import { AuthService } from '../../auth/auth.service';
import { ApiService } from '../../service/api.service';
import { es } from 'date-fns/locale';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
})
export class TableComponent implements OnInit, OnDestroy {
  @Input() data: any[] = [];
  @Input() headers: string[] = [];

  filteredData = signal<any[]>([]);
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
  currentRowIndex: number = 0;

  private subscriptions: Subscription[] = [];

  constructor(
    private authService: AuthService,
    private apiService: ApiService
  ) {}

  myUserRole: string | null = this.authService.getRole();

  role = new roles();

  formatDate(date: string | Date): string {
    return format(new Date(date), 'dd/MMM/yyyy HH:mm', { locale: es });
  }

  isAuthorized(role: String): boolean {
    return this.myUserRole === role;
  }

  onFilterChange(event: Event, index: number): void {
    const input = event.target as HTMLInputElement;
    this.filters[index] = input.value.toLowerCase();
    this.applyFilters();
  }

  onStatusClick(rowIndex: number) {
    this.selectedRowId = this.filteredData()[rowIndex].id;
    this.currentRowIndex = rowIndex;
    this.showStatusModal = true;
  }

  onPasswordClick(rowIndex: number) {
    this.selectedRowId = this.filteredData()[rowIndex].id;
    this.currentRowIndex = rowIndex;
    this.showPasswordModal = true;
  }

  onAuthorizationClick(rowIndex: number) {
    this.selectedRowId = this.filteredData()[rowIndex].id;
    this.currentRowIndex = rowIndex;
    this.showAuthorizationModal = true;
  }

  applyFilters(): void {
    this.filteredData.set(
      this.data.filter((row) => {
        return this.filters.every((filter, index) => {
          if (!filter) {
            return true;
          }
          return row.data[index].toString().toLowerCase().includes(filter);
        });
      })
    );
  }

  getSelectedRowId(): string | null {
    return this.selectedRowId;
  }

  private updateData(index: number, key: string, value: any): void {
    const updatedData = [...this.filteredData()];
    updatedData[this.currentRowIndex].data[index] = value;
    this.filteredData.set(updatedData);
  }

  onUpdateStatus(): void {
    const id = this.getSelectedRowId();
    if (id !== null) {
      const subscription = this.apiService.updateReportStatus(id, this.selectedStatus).subscribe({
        next: (response) => {
          this.updateData(7, 'delivery_status', response.delivery_status);
          this.updateData(
            3,
            'delivery_date',
            response.delivery_date
              ? this.formatDate(response.delivery_date)
              : 'N/A'
          );
        },
        error: (error) => {
          console.error('Error updating status:', error);
        },
        complete: () => {},
      });
      this.subscriptions.push(subscription);
    } else {
      console.error('ID is null, cannot update status');
    }
    this.selectedStatus = '';
    this.showStatusModal = false;
  }

  onUpdatePassword() {
    const id = this.getSelectedRowId();
    if (this.newPassword === '' || this.confirmPassword === '') {
      console.error('Contraseñas vacías');
      return;
    } else if (this.newPassword === this.confirmPassword) {
      const subscription = this.apiService.updatePassword(this.newPassword, id!).subscribe();
      this.subscriptions.push(subscription);
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
      const subscription = this.apiService
        .updateAuthorization(id!, this.selectedAuthorization)
        .subscribe({
          next: (response) => {
            this.updateData(4, 'role', response.role);
          },
          error: (error) => {
            console.error('Error updating authorization:', error);
          },
          complete: () => {},
        });
      this.subscriptions.push(subscription);
      this.showAuthorizationModal = false;
      this.selectedAuthorization = '';
    }
  }

  ngOnInit(): void {
    this.filteredData.set([...this.data]);
    this.filters = Array(this.headers.length).fill('');
    this.showFilters = Array(this.headers.length).fill(false);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
