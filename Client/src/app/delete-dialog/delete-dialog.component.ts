import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { EmployeeService } from '../Employee/employee.service';
import { Router } from '@angular/router';

export interface DialogData {
  id: number;
  firstName: string;
  lastName: string;
}
@Component({
  selector: 'app-delete-dialog',
  standalone: true,
  imports: [  
    MatFormFieldModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,],
  templateUrl: './delete-dialog.component.html',
  styleUrl: './delete-dialog.component.css'
})
export class DeleteDialogComponent {
  
  constructor(private router: Router,
    public dialogRef: MatDialogRef<DeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,private _employeeService:EmployeeService 
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  deleteEmployee()
  {
    this._employeeService.deleteEmployee(this.data.id).subscribe({
      next: (res) => {
          this.dialogRef.close(true);
       },
      error: (err) => {
        console.log(err);
      }
    });
  }
}
