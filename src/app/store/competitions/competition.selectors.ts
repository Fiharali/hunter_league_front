
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CompetitionState } from './competition.reducer';

export const selectCompetitionState = createFeatureSelector<CompetitionState>('competition');

export const selectCompetition = createSelector(
  selectCompetitionState,
  (state: CompetitionState) => state.competition
);

export const selectLoading = createSelector(
  selectCompetitionState,
  (state: CompetitionState) => state.loading
);

export const selectError = createSelector(
  selectCompetitionState,
  (state: CompetitionState) => state.error
);

export const selectCompetitionById = (id: string) => createSelector(
  selectCompetition,
  (competition) => competition.find(s => s.id === id)
);
