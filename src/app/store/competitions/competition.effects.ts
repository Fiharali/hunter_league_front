import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError, tap } from 'rxjs/operators';
import { ApiService } from '../../services/api.service';
import * as CompetitionActions from './competition.actions';
import { Competition } from '../../models/competition.module';



export class CompetitionEffects {

  private actions$ = inject(Actions);
  private apiService = inject(ApiService);


  loadCompetition$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CompetitionActions.loadCompetition),
      tap(() => console.log('Action detected: Load Competition')),
      mergeMap(() => {
        console.log('Making API call');
        return this.apiService.get<Competition[]>('/competitions').pipe(
          tap(competition => console.log('API response:', competition)),
          map(competition => CompetitionActions.loadCompetitionSuccess({ competition })),
          catchError(error => {
            console.error('API error:', error);
            return of(CompetitionActions.loadCompetitionFailure({ error }));
          })
        );
      })
    )
  );



  createCompetition$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CompetitionActions.createCompetition),
      mergeMap(action =>
        this.apiService.post<Competition>('/competition', action.competition).pipe(
          map(competition => CompetitionActions.createCompetitionSuccess({ competition })),
          catchError(error => of(CompetitionActions.createCompetitionFailure({ error })))
        )
      )
    )
  );

  deleteCompetition$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CompetitionActions.deleteCompetition),
      mergeMap(action =>
        this.apiService.delete<void>(`/competition/${action.id}`).pipe(
          map(() => CompetitionActions.deleteCompetitionSuccess({ id: action.id })),
          catchError(error => of(CompetitionActions.deleteCompetitionFailure({ error })))
        )
      )
    )
  );
}
