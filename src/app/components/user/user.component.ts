import { ApiService } from './../../services/api.service';
import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

export interface User {
  id: string;
  email: string;
  cin: string;
  firstName: string;
  lastName: string;
  role: string;

}

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class UserComponent implements OnInit {

  isLoading = false;

  users: User[] = [];

  constructor(private api: ApiService) {}
  getUsers(): Observable<User[]> {
    this.isLoading = true;
    return this.api.get<User[]>('/users');
  }

  ngOnInit() {
    this.getUsers().subscribe(users => {
      this.users = users;
      console.log(users);
    });
    setTimeout(() => {
      this.isLoading = false;
    }, 500);

  }
}
