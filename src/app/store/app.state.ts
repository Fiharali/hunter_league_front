
import { SpeciesState } from './species/species.reducer';
import { UserState } from './users';

export interface AppState {
  species: SpeciesState;
  member: UserState;
}
