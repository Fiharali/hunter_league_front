import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators , ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { LoginResponse, LoginService } from './login.service';


@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule , CommonModule],
  templateUrl: './login.component.html',
})



export class LoginComponent implements OnInit{

  loginForm: FormGroup;
  loading: boolean = false;


  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      remember: [false]
    });
  }

get email() { return this.loginForm.get('email'); }
 get password() { return this.loginForm.get('password'); }

 onSubmit() {
  this.loading = true;
  if (this.loginForm.valid) {
    const { email, password } = this.loginForm.value;
    this.loginService.login({ email, password }).subscribe({
      next: (response : LoginResponse) => {
       if (response && response.token) {
          localStorage.setItem('auth-token', response.token);
          this.router.navigate(['/']);
       }
      },
      error: (error) => {
        if (error?.error?.message) {
          this.loginForm.get('email')?.setErrors({
            serverError: error.error.message
          });
        }
      },
      complete: () => {
        this.loading = false;
      },
    });

  }
  this.loading = false;
}

ngOnInit() {
  const token = localStorage.getItem('auth-token');
  if (token) {
    this.router.navigate(['/']);
  }
}

}
