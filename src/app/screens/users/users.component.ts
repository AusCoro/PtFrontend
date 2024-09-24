import { Component } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { UserInterface } from '../../models/users';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './users.component.html',
})
export class UsersComponent {
  showModal: boolean = false;
  tableData: any[] = [];
  users: UserInterface[] = [
    {
      _id: '1',
      userName: 'user1',
      password: 'password1',
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
      email: 'admin',
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
      email: 'admin',
      role: 'Operador',
      token:
        'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ5byIsImlhdCI6MTcyNzExMTU0OCwiZXhwIjoxNzU4NjQ3ODcxLCJhdWQiOiJjcmV3Iiwic3ViIjoiYWRtaW4ifQ.vgQH_TXyujlffFffdyHEAU4-lPrzrFbGVB6R1wAb0lI',
    },
  ];
  
  tableHeaders = [
    'id',
    'Usuario',
    'Contraseña',
    'Nivel de autorización',
  ];

  
  ngOnInit(): void {
    this.tableData = this.users.map(users => ({
      data: [
        users._id,
        users.userName,
        '••••••••',
        users.role,
      ],
      id: users._id,
    }));
  }

}
