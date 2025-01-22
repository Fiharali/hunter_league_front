
import { ActionReducerMap } from '@ngrx/store';
import { speciesReducer, SpeciesState } from './species/species.reducer';
import { userReducer, UserState } from './users';


export interface AppState {
  species: SpeciesState;
  user: UserState;
}

export const reducers: ActionReducerMap<AppState> = {
  species: speciesReducer,
  user: userReducer,
};
