import { Component, OnInit, OnDestroy, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { CompetitionFacade } from '../../store/competitions/competition.facade';

export interface Competition {
  id: string;
  date: Date;
  participationCount: number;
  minParticipants: number;
  maxParticipants: number;
  location: string;
}

@Component({
  selector: 'app-competition',
  templateUrl: './competition.component.html',
  styleUrls: ['./competition.component.css'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA
  ],
  imports: [RouterModule]
})
export class CompetitionComponent implements OnInit, OnDestroy {

  private destroy$ = new Subject<void>();

  isLoading = false;
  competitions: Competition[] = [];
  error: string | null = null;

  constructor(private competitionFacade: CompetitionFacade) {}

  ngOnInit(): void {
    this.loadCompetitions();

    this.competitionFacade.loading$
      .pipe(takeUntil(this.destroy$))
      .subscribe(loading => {
        this.isLoading = loading;
        console.log('Loading state:', loading);
      });

    this.competitionFacade.competition$
      .pipe(takeUntil(this.destroy$))
      .subscribe(data => {
        this.competitions = data;
        console.log('Competitions data:', data);
      });

    this.competitionFacade.error$
      .pipe(takeUntil(this.destroy$))
      .subscribe(error => {
        this.error = error;
        if (error) {
          console.error('Competitions error:', error);
        }
      });
  }

  private loadCompetitions(): void {
    this.competitionFacade.loadAll();
  }

  delete(competitionId: string): void {
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
        this.isLoading = true;
        this.competitionFacade.delete(competitionId);
        Swal.fire({
          title: "Deleted!",
          text: "Competition has been deleted successfully.",
          icon: "success"
        });
        this.isLoading = false;
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
