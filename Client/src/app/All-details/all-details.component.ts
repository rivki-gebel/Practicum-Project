import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Employee } from '../Employee/employeeModel';
import { EmployeeService } from '../Employee/employee.service';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { Observable, map } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatAccordion, MatExpansionModule } from '@angular/material/expansion';
import {MatTooltipModule} from '@angular/material/tooltip';
import { MatTableDataSource } from '@angular/material/table';
@Component({
  selector: 'app-all-details',
  standalone: true,
  imports: [CommonModule, MatAccordion, MatExpansionModule, MatIconModule, MatButtonModule, MatPaginatorModule,
    MatTooltipModule],
  templateUrl: './all-details.component.html',
  styleUrl: './all-details.component.css',
})
export class AllDetailsComponent implements OnInit {
  employees$: Observable<Employee[]>;

  constructor(private _employeeService: EmployeeService, public dialog: MatDialog,private router:Router) { }

  ngOnInit(): void {    
    this.employees$ =this._employeeService.getEmployeeListObservable();      
  } 
  openDialog(event: Event,id: number, firstName: string, lastName: string): void {
    event.stopPropagation();
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: { id, firstName, lastName },
    });
  
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this._employeeService.deleteEmployee(id).subscribe();
      }
    });
  }
  editEmployee(event: Event,employee:Employee) {
    event.stopPropagation();
    this._employeeService.employeeToEdit=employee;
    this.router.navigate(['/action/edit-employee'])
  }
  
  downloadCSV() {
    const csvRows = [];
    const header = ['First Name', 'Last Name', 'Identity Number', 'Start Date'];
    csvRows.push(header.join(','));
    this.employees$.subscribe(employees => {
      employees.forEach(emp => {
        const row = [
          emp.firstName,
          emp.lastName,
          emp.identityNum,
          emp.startDate,
        ];
        csvRows.push(row.join(','));
      });
      const csvContent = csvRows.join('\n');
      const blob = new Blob([csvContent], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.setAttribute('style', 'display:none;');
      a.href = url;
      a.download = 'employees.csv';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    });
  }
  toAdd()
  {
    this.router.navigate(['/action/add-employee'])
  }
}
