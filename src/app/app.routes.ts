import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { AppComponent } from './app.component';
import { authGuard } from './guard/auth.guard';
import { redirectIfAuthenticatedGuard } from './guard/redirectIfAuthenticatedGuard';
import { StatistiquesComponent } from './components/statistiques/statistiques.component';
import { AdminLayoutComponent } from './pages/adminLayout/adminLayout.component';
import { UserComponent } from './components/user/user.component';
import { UserCreateComponent } from './components/user/create/userCreate.component';
import { MemberLayoutComponent } from './pages/memberLayout/memberLayout.component';
import { JuryLayoutComponent } from './pages/juryLayout/juryLayout.component';
import { roleGuard } from './guard/role.guard';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [redirectIfAuthenticatedGuard],
  },
  {
    path: 'admin',
    component: AdminLayoutComponent,
    children: [
      {
        path: '',
        component: StatistiquesComponent,
      },

      {
        path: 'users',
        component: UserComponent,
      },
      {
        path: 'users/create',
        component: UserCreateComponent,
      },
    ],
    canActivate: [authGuard, roleGuard],
    data: { role: 'ADMIN' }
  },

  {
    path: 'member',
    component: MemberLayoutComponent,
    children: [
      {
        path: '',
        component: StatistiquesComponent,
      },
    ],
    canActivate: [authGuard, roleGuard],
    data: { role: 'MEMBER' }
  },

  {
    path: 'jury',
    component: JuryLayoutComponent,
    children: [
      {
        path: '',
        component: StatistiquesComponent,
      },
    ],
    canActivate: [authGuard, roleGuard],
    data: { role: 'JURY' }
  },
];
