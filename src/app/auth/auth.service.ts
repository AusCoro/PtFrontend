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
      role: 'Admin',
      token:
        'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ5byIsImlhdCI6MTcyNzExMTU0OCwiZXhwIjoxNzU4NjQ3ODcxLCJhdWQiOiJjcmV3Iiwic3ViIjoiYWRtaW4ifQ.vgQH_TXyujlffFffdyHEAU4-lPrzrFbGVB6R1wAb0lI',
    },
    {
      _id: '2',
      userName: 'user2',
      password: 'password1',
      firstName: 'John',
      lastName: 'Doe',
      email: 'sup',
      role: 'Supervisor',
      token:
        'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ5byIsImlhdCI6MTcyNzExMTU0OCwiZXhwIjoxNzU4NjQ3ODcxLCJhdWQiOiJjcmV3Iiwic3ViIjoiYWRtaW4ifQ.vgQH_TXyujlffFffdyHEAU4-lPrzrFbGVB6R1wAb0lI',
    },
    {
      _id: '3',
      userName: 'user2',
      password: 'password1',
      firstName: 'John',
      lastName: 'Doe',
      email: 'oper',
      role: 'Operador',
      token:
        'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ5byIsImlhdCI6MTcyNzExMTU0OCwiZXhwIjoxNzU4NjQ3ODcxLCJhdWQiOiJjcmV3Iiwic3ViIjoiYWRtaW4ifQ.vgQH_TXyujlffFffdyHEAU4-lPrzrFbGVB6R1wAb0lI',
    },
  ];

  isLoggedIn(): boolean {
    return this.loggedIn;
  }

  login(email: string, password: string): boolean {
    const user = this.users.find(u => u.email === email && u.password === password);
    if (user) {
      this.loggedIn = true;
      const token = user.token; // Aquí deberías obtener el token real del servidor
      localStorage.setItem('authToken', token);
      localStorage.setItem('user', JSON.stringify(user));
      return true;
    }
    return false;
  }

  logout(): void {
    this.loggedIn = false;
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
  }
}