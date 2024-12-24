import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const token = localStorage.getItem('auth-token');

  if (!token) {
    setTimeout(() => {
      router.navigate(['/login']);
    }, 0);
    return false;
  }

  return true;
};
