import { Injectable } from '@angular/core';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private userService: UserService) {}

  // Método para el login usando UserService
  login(username: string, password: string) {
    return this.userService.login(username, password);
  }

  // Método para obtener todos los usuarios usando UserService
  getUsers() {
    return this.userService.getUsers();
  }

  // Método para crear un usuario nuevo usando UserService
  createUser(user: any) {
    return this.userService.createUser(user);
  }

}
