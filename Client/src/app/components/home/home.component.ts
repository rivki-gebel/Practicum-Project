import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AddJobDialogComponent } from '../add-job-dialog/add-job-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterOutlet,MatProgressSpinnerModule,MatIconModule,MatButtonModule,MatTooltipModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  constructor(private router: Router,public dialog: MatDialog,private _snackBar: MatSnackBar) {    
  }

  navigateToAllDetails() {
    this.router.navigate(['/all-details']);
  }
  navigateToAddEmployee() {
    this.router.navigate(['/add-employee']);
  }
  openAddJobDialog(): void {
        const dialogRef = this.dialog.open(AddJobDialogComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this._snackBar.open("Job added successfully!", "Ok", {
          horizontalPosition: 'left',
          duration: 3000
        })
      }
    });
  }
}
