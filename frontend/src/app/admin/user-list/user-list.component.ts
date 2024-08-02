import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html'
})
export class UserListComponent implements OnInit {
  users: User[] = [];

  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.adminService.getAllUsers().subscribe(data => {
      this.users = data;
    });
  }

  deleteUser(id: number): void {
    this.adminService.deleteUser(id).subscribe(() => {
      this.loadUsers();
    });
  }
}