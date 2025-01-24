
import { ActionReducerMap } from '@ngrx/store';
import { speciesReducer, SpeciesState } from './species/species.reducer';
import { userReducer, UserState } from './users';

import { competitionReducer } from './competitions';
import { AppState } from './app.state';



export const reducers: ActionReducerMap<AppState> = {
  species: speciesReducer,
  member: userReducer,
  competitions: competitionReducer
};
