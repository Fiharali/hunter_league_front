import { createAction, props } from '@ngrx/store';
import { Species } from '../../models/species.module';

export const loadSpecies = createAction('[Species] Load Species');

export const loadSpeciesSuccess = createAction(
  '[Species] Load Species Success',
  props<{ species: Species[] }>()
);
export const loadSpeciesFailure = createAction(
  '[Species] Load Species Failure',
  props<{ error: any }>()
);

export const createSpecies = createAction(
  '[Species] Create Species',
  props<{ species: Species }>()
);
export const createSpeciesSuccess = createAction(
  '[Species] Create Species Success',
  props<{ species: Species }>()
);
export const createSpeciesFailure = createAction(
  '[Species] Create Species Failure',
  props<{ error: any }>()
);

export const deleteSpecies = createAction(
  '[Species] Delete Species',
  props<{ id: string }>()
);
export const deleteSpeciesSuccess = createAction(
  '[Species] Delete Species Success',
  props<{ id: string }>()
);
export const deleteSpeciesFailure = createAction(
  '[Species] Delete Species Failure',
  props<{ error: any }>()
);
