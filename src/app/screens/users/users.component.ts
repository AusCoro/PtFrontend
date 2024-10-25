import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { UserInterface } from '../../models/users';
import { ApiService } from '../../service/api.service';
import { firstValueFrom } from 'rxjs';
import { DeliveryZone } from '../../models/delivery-zone.model';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [SharedModule, CommonModule, FormsModule],
  templateUrl: './users.component.html',
})
export class UsersComponent implements OnInit {
  showModal: boolean = false;
  tableData = signal<any[]>([]);
  users: UserInterface[] = [];
  loading: boolean = true; // Bandera de carga
  deliveryZones = DeliveryZone;

  constructor(private apiService: ApiService) {}

  tableHeaders = [
    'id',
    'Usuario',
    'Nombre',
    'Contraseña',
    'Nivel de autorización',
  ];

  newUser: UserInterface = {
    id: '',
    username: '',
    password: '',
    first_name: '',
    last_name: '',
    full_name: '',
    zone: '',
    role: '',
  };

  onCancel() {
    this.newUser = {
      id: '',
      username: '',
      full_name: '',
      first_name: '',
      last_name: '',
      role: '',
      zone: '',
      password: '',
    };
    this.showModal = false;
  }

  isUserEmpty(user: UserInterface) {
    return (
      user.password === '' ||
      user.first_name === '' ||
      user.last_name === '' ||
      user.role === '' ||
      user.zone === ''
    );
  }

  async onSubmit() {
    if (this.isUserEmpty(this.newUser)) {
      return;
    } else {
      try {
        const response = await firstValueFrom(
          this.apiService.createUser(this.newUser)
        );
        this.tableData.update((current: any[]) => {
          current.push({
            data: [
              response.id,
              response.username,
              response.full_name,
              '••••••••',
              response.role,
            ],
            id: response.id,
          });
          return current;
        });
        this.loading = true;
      } catch (error) {
        console.error('Error creating user:', error);
      } finally {
        this.onCancel();
        setTimeout(() => {
          this.loading = false;
        }, 100);
      }
    }
  }

  ngOnInit(): void {
    this.loadUsers();
  }

  async loadUsers() {
    try {
      this.users = await firstValueFrom(this.apiService.getUsers());
      this.tableData.set(
        this.users.map((user) => ({
          data: [user.id, user.username, user.full_name, '••••••••', user.role],
          id: user.id,
        }))
      );
    } catch (error) {
      console.error('Error loading users:', error);
    } finally {
      this.loading = false;
    }
  }
}
