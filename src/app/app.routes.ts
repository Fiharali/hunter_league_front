import { JuryCompetitionComponent } from './jury/competition/juryCompetition.component';
import { Routes }                       from '@angular/router';
import { LoginComponent }               from './components/login/login.component';
import { authGuard }                    from './guard/auth.guard';

import { StatistiquesComponent }        from './components/statistiques/statistiques.component';
import { AdminLayoutComponent }         from './pages/adminLayout/adminLayout.component';
import { UserComponent }                from './components/user/user.component';
import { UserCreateComponent }          from './components/user/create/userCreate.component';
import { MemberLayoutComponent }        from './pages/memberLayout/memberLayout.component';
import { JuryLayoutComponent }          from './pages/juryLayout/juryLayout.component';
import { roleGuard }                    from './guard/role.guard';
import { CompetitionComponent }         from './components/competition/competition.component';
import { redirectIfAuthenticatedGuard } from './guard/redirectIfAuthenticatedGuard';
import { CompetitionCreateComponent }   from './components/competition/create/competitionCreate.component';
import {SpeciesComponent} from './components/species/species.component';
import {SpeciesCreateComponent} from './components/species/create/speciesCreate.component';
import {MemberCompetitionComponent} from './components/member/competition/memberCompetition.component';
import { PodiumComponent } from './components/podium/podium.component';











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
      {
        path: 'competitions',
        component: CompetitionComponent,
      },
      {
        path: 'competitions/create',
        component: CompetitionCreateComponent,
      },
      {
        path: 'species',
        component: SpeciesComponent,
      },
      {
        path: 'species/create',
        component: SpeciesCreateComponent,
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
      {
        path: 'competitions',
        component: MemberCompetitionComponent,
      },
      {
        path: 'competitions/:id',
        component: PodiumComponent,
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
      {
        path: 'competitions',
        component: JuryCompetitionComponent,
      },
      {
        path: 'competitions/:id',
        component: PodiumComponent,
      },
    ],
    canActivate: [authGuard, roleGuard],
    data: { role: 'JURY' }
  },
];
