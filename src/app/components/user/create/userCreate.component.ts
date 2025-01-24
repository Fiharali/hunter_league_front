
import { Component, OnInit, OnDestroy, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { UserFacade } from '../../../store/users/user.facade';
import { User } from '../../../models/user.module';



@Component({
  selector: 'app-user-create',
  templateUrl: './userCreate.component.html',
  imports: [ReactiveFormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class UserCreateComponent implements OnInit, OnDestroy {

  private destroy$ = new Subject<void>();

  userForm: FormGroup;
  isLoading = false;
  error: string | null = null;

  constructor(
    private fb: FormBuilder,
    private userFacade: UserFacade,
    private router: Router
  ) {
    this.userForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      lastName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      role: ['', [Validators.required]],
      nationality: ['', [Validators.required, Validators.minLength(5)]],
      cin: ['', [Validators.required, Validators.minLength(5)]],
      licenseExpirationDate: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      const userData: User = {
        ...this.userForm.value,
      };
      this.isLoading = true;
      this.userFacade.create(userData).pipe(
        takeUntil(this.destroy$)
      ).subscribe({
        next: (newUser: User) => {
          console.log('User created:', newUser);
          this.userForm.reset();
          Swal.fire({
            title: 'Good job!',
            text: 'User created successfully.',
            icon: 'success'
          });
          this.isLoading = false;
          this.router.navigate(['/users']);
        },
        error: (error: any) => {
          console.error('Error creating user:', error);
          this.error = error.message;
          Swal.fire({
            title: 'Error!',
            text: error.message,
            icon: 'error'
          });
          this.isLoading = false;
        }
      });
    } else {
      console.error('Form is invalid');
      this.userForm.markAllAsTouched();
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
