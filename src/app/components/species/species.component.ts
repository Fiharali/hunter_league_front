import { ApiService } from '../../services/api.service';
import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Observable, Subject, takeUntil } from 'rxjs';
import Swal from 'sweetalert2';
import { loadSpecies, loadSpeciesFailure, loadSpeciesSuccess, SpeciesFacade } from '../../store/species';
import { Store } from '@ngrx/store';

export interface Species {
  id: string;
  name: string;
  category: string;
  minimumWeight: number;
  difficulty: string;

}

@Component({
  selector: 'app-species',
  templateUrl: './species.component.html',
  styleUrls: ['./species.component.css'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports : [RouterModule]
})
export class SpeciesComponent implements OnInit {

  private destroy$ = new Subject<void>();

  isLoading = false;
  species: Species[] = [];
  error: string | null = null;

  constructor(
    private speciesFacade: SpeciesFacade,
    private api: ApiService
  ) {}

  ngOnInit() {

    this.speciesFacade.loadAll();

    this.speciesFacade.loading$
    .pipe(takeUntil(this.destroy$))
    .subscribe(loading => {
      this.isLoading = loading;
      console.log('Loading state:', loading);
    });


    this.speciesFacade.species$
    .pipe(takeUntil(this.destroy$))
    .subscribe(data => {
      this.species = data;
      console.log('Species data:', data);
    });

    this.speciesFacade.error$
    .pipe(takeUntil(this.destroy$))
    .subscribe(error => {
      this.error = error;
      if (error) {
        console.error('Species error:', error);
      }
    });
  }



  delete(speciesId: string) {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.api.delete<any>(`/species/${speciesId}`).subscribe({
          next: () => {
            this.species = this.species.filter(species => species.id !== speciesId);
            Swal.fire({
              title: "Deleted!",
              text: "Species has been deleted successfully.",
              icon: "success"
            });
          },
          error: (error) => {
            Swal.fire({
              title: "Error!",
              text: "Failed to delete species. Please try again.",
              icon: "error"
            });
            console.error('Error deleting species:', error);
          }
        });
      }
    });
  }
}
