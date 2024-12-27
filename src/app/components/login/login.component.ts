import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators , ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { LoginResponse, LoginService } from './login.service';
import e from 'express';


@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule , CommonModule],
  templateUrl: './login.component.html',
})



export class LoginComponent {

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
            const decodedData = this.decodeToken(response.token);

            if (decodedData.role === 'ADMIN') {
              //this.router.navigate(['/admin']);
              console.log('this is Admin');
            } else if (decodedData.role === 'MEMBER') {
             // this.router.navigate(['/member']);
             console.log('this is Member');
            }else {
             // this.router.navigate(['/jury']);
             console.log('this is jury');

            }
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



decodeToken(token: string): any {
  try {
    const payload = token.split('.')[1];
    return JSON.parse(atob(payload));
  } catch (e) {
    console.error('Invalid token:', e);
    return null;
  }
}

}
