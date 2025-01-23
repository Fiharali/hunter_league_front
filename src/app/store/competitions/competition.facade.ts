// src/app/store/competitions/competition.facade.ts
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, Observable, take } from 'rxjs';
import * as CompetitionActions from './competition.actions';

import * as CompetitionSelectors from './competition.selectors';
import { Actions, ofType } from '@ngrx/effects';
import { Competition } from '../../models/competition.module';

@Injectable({ providedIn: 'root' })
export class CompetitionFacade {


  competition$: Observable<Competition[]>;
  loading$: Observable<boolean>;
  error$: Observable<string> ;

  constructor(private store: Store, private actions$: Actions) {
  this.competition$=this.store.select(CompetitionSelectors.selectCompetition);
  this.loading$ = this.store.select(CompetitionSelectors.selectLoading);
  this.error$ = this.store.select(CompetitionSelectors.selectError);
  }


  loadAll(): void {
    this.store.dispatch(CompetitionActions.loadCompetition());
  }

  create(competition: Competition): Observable<Competition> {
    this.store.dispatch(CompetitionActions.createCompetition({ competition }));
    return this.actions$.pipe(
      ofType(CompetitionActions.createCompetitionSuccess),
      map(action => action.competition),
      take(1)
    );
  }

  delete(id: string): void {
    this.store.dispatch(CompetitionActions.deleteCompetition({ id }));
  }
}
