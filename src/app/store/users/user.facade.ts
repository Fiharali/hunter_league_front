import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, Observable, take } from 'rxjs';
import { User } from '../../models/user.module';
import * as UserActions from './user.actions';
import * as UserSelectors from './user.selectors';
import { Actions, ofType } from '@ngrx/effects';


@Injectable({
  providedIn: 'root'
})

export class UserFacade {

  user$: Observable<User[]>;
  loading$: Observable<boolean>;
  error$: Observable<string>;

  constructor(private store: Store,  private actions$: Actions) {
    this.user$ = this.store.select(UserSelectors.selectUser);
    this.loading$ = this.store.select(UserSelectors.selectLoading);
    this.error$ = this.store.select(UserSelectors.selectError);

  }

  loadAll(): void {
    this.store.dispatch(UserActions.loadUser());
  }

  create(user: User): Observable<User> {
    this.store.dispatch(UserActions.createUser({ user }));
    return this.actions$.pipe(
      ofType(UserActions.createUserSuccess),
      map(action => action.user),
      take(1)
    );
  }
  delete(id: string): void {
    this.store.dispatch(UserActions.deleteUser({ id }));
  }

}
