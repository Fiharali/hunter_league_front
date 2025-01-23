import { reducers } from './store/app.reducer';
import { initialState, speciesReducer } from './store/species/species.reducer';
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { authInterceptor } from './interceptors/auth.interceptor';

import { provideHttpClient, withInterceptors } from '@angular/common/http';


import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { SpeciesEffects } from './store/species/species.effects';
import { UserEffects } from './store/users/user.effects';
import { CompetitionEffects } from './store/competitions/competition.effects';


export const appConfig: ApplicationConfig = {
  providers: [


    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes), provideClientHydration(withEventReplay()) ,
    provideHttpClient(
      withInterceptors([authInterceptor])
    ),
    provideStore(
      reducers
    ),

    provideEffects([SpeciesEffects , UserEffects ,CompetitionEffects]),

    provideZoneChangeDetection({ eventCoalescing: true }),
    provideClientHydration(withEventReplay())



  ]
};
