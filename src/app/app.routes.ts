import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { AppComponent } from './app.component';
import { authGuard } from './guard/auth.guard';
import { redirectIfAuthenticatedGuard } from './guard/redirectIfAuthenticatedGuard';
import { StatistiquesComponent } from './components/statistiques/statistiques.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { UserComponent } from './components/user/user.component';

export const routes: Routes = [

  {
    path: 'login',
    component: LoginComponent,
    canActivate: [redirectIfAuthenticatedGuard]
  },
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        component: StatistiquesComponent

      },

      {
        path: 'admin/users',
        component: UserComponent

      }
    ],
    canActivate: [authGuard]
  }





];
