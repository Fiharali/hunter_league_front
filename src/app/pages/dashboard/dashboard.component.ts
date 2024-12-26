import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [RouterModule],
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
