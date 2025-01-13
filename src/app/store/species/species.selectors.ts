
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { SpeciesState } from './species.reducer';

export const selectSpeciesState = createFeatureSelector<SpeciesState>('species');

export const selectSpecies = createSelector(
  selectSpeciesState,
  (state: SpeciesState) => state.species
);

export const selectLoading = createSelector(
  selectSpeciesState,
  (state: SpeciesState) => state.loading
);

export const selectError = createSelector(
  selectSpeciesState,
  (state: SpeciesState) => state.error
);

export const selectSpeciesById = (id: string) => createSelector(
  selectSpecies,
  (species) => species.find(s => s.id === id)
);
