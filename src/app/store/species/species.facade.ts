import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Species } from '../../models/species.module';
import * as SpeciesActions from './species.actions';
  import * as SpeciesSelectors from './species.selectors';


@Injectable({
  providedIn: 'root'
})

export class SpeciesFacade {

  species$: Observable<Species[]>;
  loading$: Observable<boolean>;
  error$: Observable<string>;

  constructor(private store: Store) {
    this.species$ = this.store.select(SpeciesSelectors.selectSpecies);
    this.loading$ = this.store.select(SpeciesSelectors.selectLoading);
    this.error$ = this.store.select(SpeciesSelectors.selectError);

  }

  loadAll(): void {
    this.store.dispatch(SpeciesActions.loadSpecies());
  }

  create(species: Species): void {
    this.store.dispatch(SpeciesActions.createSpecies({ species }));
  }

  delete(id: string): void {
    this.store.dispatch(SpeciesActions.deleteSpecies({ id }));
  }

}
