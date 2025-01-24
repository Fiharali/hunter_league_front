
import { Competition } from '../models/competition.module';
import { CompetitionState } from './competitions';
import { SpeciesState } from './species/species.reducer';
import { UserState } from './users';

export interface AppState {
  species: SpeciesState;
  member: UserState;
  competitions: CompetitionState;
}
