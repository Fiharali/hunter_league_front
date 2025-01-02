import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { RouterModule }                              from '@angular/router';
import { ApiService }                                from '../../services/api.service';
import { Observable }                                from 'rxjs';
import Swal                                          from 'sweetalert2';
import { CommonModule }                              from '@angular/common';

import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';





export interface Competition {
  id: string;
  date: Date;
  participationCount: number;
  minParticipants: number;
  maxParticipants: number;
  location: string;
}

export interface PageableResponse {
  content: Competition[];
  pageable: {
    pageNumber: number;
    pageSize: number;
    sort: {
      empty: boolean;
      sorted: boolean;
      unsorted: boolean;
    };
    offset: number;
    paged: boolean;
    unpaged: boolean;
  };
  totalElements: number;
  totalPages: number;
  last: boolean;
  size: number;
  number: number;
  sort: {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  };
  first: boolean;
  numberOfElements: number;
  empty: boolean;
}


@Component({
  selector: 'app-competition',
  templateUrl: './juryCompetition.component.html',
  styleUrls: ['./juryCompetition.component.css'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [RouterModule, CommonModule , ReactiveFormsModule]
})
export class JuryCompetitionComponent implements OnInit {
  isLoading = false;
  error: string = "";
  timeoutId: any;
  participationsToSelect: any = [];



  competitions: Competition[] = [];
  species: any[] = [];
  currentPage = 0;
  totalPages = 0;
  totalElements = 0;

  constructor(private api: ApiService) {}

  getCompetitions(): Observable<PageableResponse> {
    this.isLoading = true;
    return this.api.get<PageableResponse>('/competitions');
  }

  getSpecies(): Observable<any> {
    return this.api.get<any>('/species');
  }

  ngOnInit() {
    this.getCompetitions().subscribe({
      next: (response: PageableResponse) => {
        this.competitions = response.content;
        this.totalPages = response.totalPages;
        this.totalElements = response.totalElements;
        this.currentPage = response.number;

        console.log(response.content);

        setTimeout(() => {
          if (response.content.length > 0) {
            this.isLoading = false;
          }
        }, 500);
      },
      error: (error) => {
        console.error('Error fetching competitions:', error);
        this.isLoading = false;
      }
    });
  }

  delete(competitionId: string) {
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
        this.api.delete<any>(`/competitions/${competitionId}`).subscribe({
          next: () => {
            this.competitions = this.competitions.filter(competition => competition.id !== competitionId);
            Swal.fire({
              title: "Deleted!",
              text: "Competition has been deleted successfully.",
              icon: "success"
            });
          },
          error: (error) => {
            Swal.fire({
              title: "Error!",
              text: "Failed to delete competition. Please try again.",
              icon: "error"
            });
            console.error('Error deleting competition:', error);
          }
        });
      }
    });
  }

  addParticipation(id: string) {

    this.getSpecies().subscribe({
      next: (response) => {
        if (response) {
          this.species = response;
          console.log(response)
        }
      },
      error: (error) => {
        console.error('Error fetching species:', error);
      }
    });
  this.api.get<any>(`/participations/${id}`).subscribe({

    next: (response) => {
      if (response) {
        this.participationsToSelect = response;
        console.log( response)
      }
    },
    error: (error) => {
      console.error('Error adding participation:', error);
    }
  })
  }


  decodeToken(): any {
    try {
      const  token = localStorage.getItem('auth-token');
      // @ts-ignore
      const payload = token.split('.')[1];
      return JSON.parse(atob(payload));
    } catch (e) {
      console.error('Invalid token:', e);
      return null;
    }
  }
}
