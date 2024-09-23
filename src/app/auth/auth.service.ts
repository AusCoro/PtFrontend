import { Injectable } from '@angular/core';
import { UserInterface } from '../models/users'; // Asegúrate de que la ruta sea correcta

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = false;
  private users: UserInterface[] = [
    {
      _id: '1',
      userName: 'user1',
      password: 'admin',
      firstName: 'John',
      lastName: 'Doe',
      email: 'admin',
      role: 'admin',
    },
  ];

  isLoggedIn(): boolean {
    return this.loggedIn;
  }

  login(email: string, password: string): boolean {
    const user = this.users.find(u => u.email === email && u.password === password);
    if (user) {
      this.loggedIn = true;
      return true;
    }
    return false;
  }

  logout(): void {
    this.loggedIn = false;
  }
}