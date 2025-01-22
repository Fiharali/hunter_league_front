import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError, tap } from 'rxjs/operators';
import { ApiService } from '../../services/api.service';
import * as UserActions from './user.actions';
import { User } from '../../models/user.module';


export class UserEffects {

  private actions$ = inject(Actions);
  private apiService = inject(ApiService);


  loadUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.loadUser),
      tap(() => console.log('Action detected: Load User')),
      mergeMap(() => {
        console.log('Making API call');
        return this.apiService.get<User[]>('/users').pipe(
          tap(user => console.log('API response:', user)),
          map(user => UserActions.loadUserSuccess({ user })),
          catchError(error => {
            console.error('API error:', error);
            return of(UserActions.loadUserFailure({ error }));
          })
        );
      })
    )
  );



  createUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.createUser),
      mergeMap(action =>
        this.apiService.post<User>('/users', action.user).pipe(
          map(user => UserActions.createUserSuccess({ user })),
          catchError(error => of(UserActions.createUserFailure({ error })))
        )
      )
    )
  );

  deleteUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.deleteUser),
      mergeMap(action =>
        this.apiService.delete<void>(`/users/${action.id}`).pipe(
          map(() => UserActions.deleteUserSuccess({ id: action.id })),
          catchError(error => of(UserActions.deleteUserFailure({ error })))
        )
      )
    )
  );
}
