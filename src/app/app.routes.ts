import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AppComponent } from './app.component';
import { authGuard } from '../guard/auth.guard';
import { redirectIfAuthenticatedGuard } from '../guard/redirectIfAuthenticatedGuard';

export const routes: Routes = [


  {
    path: '',
    component: AppComponent,
    canActivate: [authGuard]
  },

    {
        path: 'login',
        component: LoginComponent,
        canActivate: [redirectIfAuthenticatedGuard]
    }



];
