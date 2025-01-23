
import { createAction, props } from '@ngrx/store';
import { Competition } from '../../models/competition.module';


export const loadCompetition = createAction('[Competition] Load Competition');

export const loadCompetitionSuccess = createAction(
  '[Competition] Load Competition Success',
  props<{ competition: Competition[] }>()
);
export const loadCompetitionFailure = createAction(
  '[Competition] Load Competition Failure',
  props<{ error: any }>()
);

export const createCompetition = createAction(
  '[Competition] Create Competition',
  props<{ competition: Competition }>()
);
export const createCompetitionSuccess = createAction(
  '[Competition] Create Competition Success',
  props<{ competition: Competition }>()
);
export const createCompetitionFailure = createAction(
  '[Competition] Create Competition Failure',
  props<{ error: any }>()
);

export const deleteCompetition = createAction(
  '[Competition] Delete Competition',
  props<{ id: string }>()
);
export const deleteCompetitionSuccess = createAction(
  '[Competition] Delete Competition Success',
  props<{ id: string }>()
);
export const deleteCompetitionFailure = createAction(
  '[Competition] Delete Competition Failure',
  props<{ error: any }>()
);
