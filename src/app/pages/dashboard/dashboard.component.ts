import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'

})
export class DashboardComponent {

  private router: Router;

  constructor(router: Router) {
    this.router = router; 
  }


  logOut() {
    localStorage.removeItem('auth-token');
    this.router.navigate(['/login']);
  }
}
