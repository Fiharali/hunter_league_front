import { CanActivateFn } from '@angular/router';

export const redirectIfAuthenticatedGuard: CanActivateFn = (route, state) => {
  const token = localStorage.getItem('auth-token');

  if (token) {
    window.location.href = '/';
    return false;
  }
  return true;
};
