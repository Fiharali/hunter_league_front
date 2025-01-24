import { createReducer, on } from '@ngrx/store';
import { Species } from '../../models/species.module';
import * as SpeciesActions from './species.actions';


export interface SpeciesState {
  species: Species[];
  loading: boolean;
  error: any;
}


export const initialState: SpeciesState = {
  species: [],
  loading: false,
  error: null
};


export const  speciesReducer = createReducer(
  initialState,

  on(SpeciesActions.loadSpecies, state => ({
    ...state,
    loading: true,
    error: null
  })),

  on(SpeciesActions.loadSpeciesSuccess, (state, { species }) => ({
    ...state,
    species,
    loading: false
  })),

  on(SpeciesActions.loadSpeciesFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false
  })),


  on(SpeciesActions.createSpecies, state => ({
    ...state,
    loading: true
  })),

  on(SpeciesActions.createSpeciesSuccess, (state, { species }) => ({
    ...state,
    species: [...state.species, species],
    loading: false
  })),

  on(SpeciesActions.createSpeciesFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false
  })),

  on(SpeciesActions.deleteSpecies, state => ({
    ...state,
    loading: true
  })),

  on(SpeciesActions.deleteSpeciesSuccess, (state, { id }) => ({
    ...state,
    species: state.species.filter(species => species.id !== id),
    loading: false
  })),

  on(SpeciesActions.deleteSpeciesFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false
  }))

);
