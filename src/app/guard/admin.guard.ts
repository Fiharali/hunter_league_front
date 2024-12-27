import { CanActivateFn } from '@angular/router';

export const adminGardGuard: CanActivateFn = (route, state) => {
  return true;
};
