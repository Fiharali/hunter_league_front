import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators , ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { LoginResponse, LoginService } from './login.service';




@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule , CommonModule],
  templateUrl: './login.component.html',
})



export class LoginComponent {

  loginForm: FormGroup;


  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      remember: [false]
    });
  }

  get email() { return this.loginForm.get('email'); }
 get password() { return this.loginForm.get('password'); }

 onSubmit() {
  if (this.loginForm.valid) {
    const { email, password } = this.loginForm.value;
    this.loginService.login({ email, password }).subscribe({
      next: (response : LoginResponse) => {

        console.log('Login successful', response);

       if (response && response.token) {
         localStorage.setItem('auth-token', response.token);

       }
      },
      error: (error) => {
        if (error?.error?.message) {
          this.loginForm.get('email')?.setErrors({
            serverError: error.error.message
          });
        }

      }
    });
  }
}

}
