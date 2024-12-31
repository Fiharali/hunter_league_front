import { ApiService }                                              from '../../../services/api.service';
import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit }               from '@angular/core';
import { Router }                                                  from '@angular/router';
import Swal                                                        from 'sweetalert2';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';





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
export class SpeciesCreateComponent {

  speciesForm: FormGroup;
  isLoading = false;

  species: Species[] = [];

  constructor( private fb: FormBuilder, private api: ApiService ,  private router: Router) {

    this.speciesForm = this.fb.group({
      speciesType: ['',[ Validators.required ]],
      date: ['', [Validators.required ]],
      code: ['', [Validators.required , Validators.minLength(3)]],
      openRegistration: ['', [Validators.required]],
      location: ['',[ Validators.required , Validators.minLength(5)]],
      minParticipants: ['', [Validators.required , Validators.min(1)]],
      maxParticipants: ['', [Validators.required]],

    });

  }

  get speciesType() { return this.speciesForm.get('speciesType'); }
  get date() { return this.speciesForm.get('date'); }
  get code() { return this.speciesForm.get('code'); }
  get openRegistration() { return this.speciesForm.get('openRegistration'); }
  get location() { return this.speciesForm.get('location'); }
  get minParticipants() { return this.speciesForm.get('minParticipants'); }
  get maxParticipants() { return this.speciesForm.get('maxParticipants'); }




  onSubmit() {
    if (this.speciesForm.valid) {
      const speciesData = this.speciesForm.value;
      this.api.post<Species>('/speciess', speciesData).subscribe({
        next: (newCompetition) => {
          console.log('species created:', newCompetition);
          this.species.push(newCompetition);
          this.speciesForm.reset();
          Swal.fire({
            title: "Good job!",
            text: "species created successfully",
            icon: "success"
          });
        },
        error: (err) => {

          if (err?.error?.maxGreaterThanMin) {
            this.speciesForm.get('maxParticipants')?.setErrors({
              serverError: err.error.maxGreaterThanMin
            });
          }
          console.error('Error creating species:', err.error.maxGreaterThanMin);
        }
      });
    } else {
      console.error('Form is invalid');
    }
  }


}
