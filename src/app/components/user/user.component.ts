import { Component, OnInit, OnDestroy, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { UserFacade } from '../../store/users';


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
  imports: [RouterModule]
})
export class UserComponent implements OnInit, OnDestroy {

  private destroy$ = new Subject<void>();

  isLoading = false;
  users: User[] = [];
  error: string | null = null;

  constructor(private userFacade: UserFacade) {}

  ngOnInit() {
    this.loadUsers();
    this.userFacade.loading$
      .pipe(takeUntil(this.destroy$))
      .subscribe(loading => {
        this.isLoading = loading;
        console.log('Loading state:', loading);
      });

    this.userFacade.user$
      .pipe(takeUntil(this.destroy$))
      .subscribe(data => {
        this.users = data;
        console.log('Users data:', data);
      });


    this.userFacade.error$
      .pipe(takeUntil(this.destroy$))
      .subscribe(error => {
        this.error = error;
        if (error) {
          console.error('Users error:', error);
        }
      });
  }

  private loadUsers(): void {
    this.userFacade.loadAll();
  }

  delete(userId: string): void {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.userFacade.delete(userId);
        Swal.fire({
          title: "Deleted!",
          text: "User has been deleted successfully.",
          icon: "success"
        });
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
