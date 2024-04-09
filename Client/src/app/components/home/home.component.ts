import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterOutlet,MatProgressSpinnerModule,MatIconModule,MatButtonModule,MatTooltipModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  constructor(private router: Router) {    
  }

  navigateToAllDetails() {
    this.router.navigate(['/all-details']);
  }
  navigateToAddEmployee() {
    this.router.navigate(['/add-employee']);
  }
}
