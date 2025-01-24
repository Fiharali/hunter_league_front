import { createReducer, on } from '@ngrx/store';

import * as CompetitionActions from './competition.actions';
import { Competition } from '../../models/competition.module';


export interface CompetitionState {
  competition: Competition[];
  loading: boolean;
  error: any;
}


export const initialState: CompetitionState = {
  competition: [],
  loading: false,
  error: null
};


export const  competitionReducer = createReducer(
  initialState,

  on(CompetitionActions.loadCompetition, state => ({
    ...state,
    loading: true,
    error: null
  })),

  on(CompetitionActions.loadCompetitionSuccess, (state, { competition }) => ({
    ...state,
    competition,
    loading: false
  })),

  on(CompetitionActions.loadCompetitionFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false
  })),


  on(CompetitionActions.createCompetition, state => ({
    ...state,
    loading: true
  })),

  on(CompetitionActions.createCompetitionSuccess, (state, { competition }) => ({
    ...state,
    competition: [...state.competition, competition],
    loading: false
  })),

  on(CompetitionActions.createCompetitionFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false
  })),

  on(CompetitionActions.deleteCompetition, state => ({
    ...state,
    loading: true
  })),

  on(CompetitionActions.deleteCompetitionSuccess, (state, { id }) => ({
    ...state,
    competition: state.competition.filter(competition => competition.id !== id),
    loading: false
  })),

  on(CompetitionActions.deleteCompetitionFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false
  }))

);
