import { Component, OnInit, OnDestroy, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { CompetitionFacade } from '../../../store/competitions';
import { Competition } from '../competition.component';


@Component({
  selector: 'app-competition-create',
  templateUrl: './competitionCreate.component.html',
  imports: [ReactiveFormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CompetitionCreateComponent implements OnInit, OnDestroy {

  private destroy$ = new Subject<void>();

  competitionForm: FormGroup;
  isLoading = false;
  error: string | null = null;

  constructor(
    private fb: FormBuilder,
    private competitionFacade: CompetitionFacade,
    private router: Router
  ) {
    this.competitionForm = this.fb.group({
      speciesType: ['', [Validators.required]],
      date: ['', [Validators.required]],
      code: ['', [Validators.required, Validators.minLength(3)]],
      openRegistration: ['', [Validators.required]],
      location: ['', [Validators.required, Validators.minLength(5)]],
      minParticipants: ['', [Validators.required, Validators.min(1)]],
      maxParticipants: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    if (this.competitionForm.valid) {
      const competitionData: Competition = {
        ...this.competitionForm.value,
      };
      this.isLoading = true;
      this.competitionFacade.create(competitionData).pipe(
        takeUntil(this.destroy$)
      ).subscribe({
        next: (newCompetition: Competition) => {
          console.log('Competition created:', newCompetition);
          this.competitionForm.reset();
          Swal.fire({
            title: 'Good job!',
            text: 'Competition created successfully.',
            icon: 'success'
          });
          this.isLoading = false;
          this.router.navigate(['/competitions']);
        },
        error: (error: any) => {
          console.error('Error creating competition:', error);
          this.error = error;
          Swal.fire({
            title: 'Error!',
            text: 'Failed to create competition. Please try again.',
            icon: 'error'
          });
          this.isLoading = false;
        }
      });
    } else {
      console.error('Form is invalid');
      this.competitionForm.markAllAsTouched();
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
