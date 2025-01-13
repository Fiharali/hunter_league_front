import { ApiService }                                              from '../../../services/api.service';
import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit }               from '@angular/core';
import { Router }                                                  from '@angular/router';
import Swal                                                        from 'sweetalert2';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { on } from 'events';
import { SpeciesFacade } from '../../../store/species';





export interface Species {
  id: string;
  email: string;
  cin: string;
  firstName: string;
  lastName: string;
  role: string;

}

@Component({
  selector: 'app-species-create',
  templateUrl: './speciesCreate.component.html',
  imports: [ReactiveFormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SpeciesCreateComponent  implements OnInit {

  speciesForm: FormGroup;
  isLoading = false;
  private destroy$ = new Subject<void>();
  species: Species[] = [];
  private isSubmitted = false;

  constructor( private fb: FormBuilder, private api: ApiService ,  private router: Router , private speciesFacade: SpeciesFacade) {

    this.speciesForm = this.fb.group({
      name: ['',[ Validators.required ]],
      category: ['', [Validators.required ]],
      minimumWeight: ['', [Validators.required  , Validators.min(0)]],
      difficulty: ['', [Validators.required ]],
      points: ['', [Validators.required , Validators.min(0)]],
    });

  }


  ngOnInit(): void {

    this.speciesFacade.loading$
    .pipe(takeUntil(this.destroy$))
    .subscribe(loading => {
      this.isLoading = loading;
    });


    this.speciesFacade.error$
    .pipe(takeUntil(this.destroy$))
    .subscribe(error => {
      if (error && this.isSubmitted) {
        Swal.fire({
          title: "Error!",
          text: "Failed to create species. Please try again.",
          icon: "error"
        });
        console.error('Error creating species:', error);
        this.isSubmitted = false;
      }
    });

    this.speciesFacade.species$
    .pipe(takeUntil(this.destroy$))
    .subscribe(() => {
      if (this.isSubmitted) {
      this.speciesForm.reset();
      Swal.fire({
        title: "Good job!",
        text: "Species created successfully hh ",
        icon: "success"
      });
      this.isSubmitted = false;
    }
    });

  }

    get name() { return this.speciesForm.get('name'); }
    get category() { return this.speciesForm.get('category'); }
    get minimumWeight() { return this.speciesForm.get('minimumWeight'); }
    get difficulty() { return this.speciesForm.get('difficulty'); }
    get points() { return this.speciesForm.get('points'); }




  onSubmit() {
    if (this.speciesForm.valid) {
      const speciesData = this.speciesForm.value;
      this.speciesFacade.create(speciesData);

    } else {
      Object.keys(this.speciesForm.controls).forEach(key => {
        const control = this.speciesForm.get(key);
        control?.markAsTouched();
      });
      console.error('Form is invalid');
    }
  }


}
