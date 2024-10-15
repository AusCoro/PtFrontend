import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { UserInterface } from '../../models/users';
import { ApiService } from '../../service/api.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [SharedModule, CommonModule, FormsModule],
  templateUrl: './users.component.html',
})
export class UsersComponent implements OnInit {
  showModal: boolean = false;
  tableData: any[] = [];
  users: UserInterface[] = [];
  loading: boolean = true; // Bandera de carga

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
    role: '',
  };

  onCancel() {
    this.showModal = false;
  }

  isUserEmpty(user: UserInterface) {
    return (
      user.password === '' ||
      user.first_name === '' ||
      user.last_name === '' ||
      user.role === ''
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
        this.users.push(response);
        console.log('User created:', response);
      } catch (error) {
        console.error('Error creating user:', error);
      } finally {
        this.newUser = {
          id: '',
          username: '',
          full_name: '',
          first_name: '',
          last_name: '',
          role: '',
          password: '',
        };
        this.showModal = false;
      }
    }
  }

  ngOnInit(): void {
    this.loadUsers();
  }

  async loadUsers() {
    try {
      this.users = await firstValueFrom(this.apiService.getUsers());
      this.tableData = this.users.map((user) => ({
        data: [user.id, user.username, user.full_name, '••••••••', user.role],
        id: user.id,
      }));
    } catch (error) {
      console.error('Error loading users:', error);
    } finally {
      this.loading = false;
    }
  }
}
