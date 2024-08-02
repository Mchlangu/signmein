import { Component } from '@angular/core';
import { User } from '../../models/user.model';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html'
})
export class AddUserComponent {
  user: User = { name: '', username: '', email: '', password: '', roles: [] };

  constructor(private adminService: AdminService) { }

  addUser(): void {
    this.adminService.createUser(this.user).subscribe(() => {
      alert('User added successfully');
      this.user = { name: '', username: '', email: '', password: '', roles: [] };
    });
  }
}
