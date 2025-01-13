import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError, tap } from 'rxjs/operators';
import { ApiService } from '../../services/api.service';
import * as SpeciesActions from './species.actions';
import { Species } from '../../models/species.module';


export class SpeciesEffects {

  private actions$ = inject(Actions);
  private apiService = inject(ApiService);


  loadSpecies$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SpeciesActions.loadSpecies),
      tap(() => console.log('Action detected: Load Species')),
      mergeMap(() => {
        console.log('Making API call');
        return this.apiService.get<Species[]>('/species').pipe(
          tap(species => console.log('API response:', species)),
          map(species => SpeciesActions.loadSpeciesSuccess({ species })),
          catchError(error => {
            console.error('API error:', error);
            return of(SpeciesActions.loadSpeciesFailure({ error }));
          })
        );
      })
    )
  );



  createSpecies$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SpeciesActions.createSpecies),
      mergeMap(action =>
        this.apiService.post<Species>('/species', action.species).pipe(
          map(species => SpeciesActions.createSpeciesSuccess({ species })),
          catchError(error => of(SpeciesActions.createSpeciesFailure({ error })))
        )
      )
    )
  );

  deleteSpecies$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SpeciesActions.deleteSpecies),
      mergeMap(action =>
        this.apiService.delete<void>(`/species/${action.id}`).pipe(
          map(() => SpeciesActions.deleteSpeciesSuccess({ id: action.id })),
          catchError(error => of(SpeciesActions.deleteSpeciesFailure({ error })))
        )
      )
    )
  );
}
