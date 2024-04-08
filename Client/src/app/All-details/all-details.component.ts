import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, debounceTime, fromEvent, map, startWith } from 'rxjs';
import { Router } from '@angular/router';
import { Employee } from '../Employee/employeeModel';
import { EmployeeService } from '../Employee/employee.service';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatAccordion, MatExpansionModule } from '@angular/material/expansion';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-all-details',
  standalone: true,
  imports: [CommonModule, MatAccordion, MatExpansionModule, MatIconModule, MatButtonModule,
    MatTooltipModule, MatCardModule],
  templateUrl: './all-details.component.html',
  styleUrl: './all-details.component.css',
})
export class AllDetailsComponent implements OnInit, AfterViewInit {
  employees$: Observable<Employee[]>;
  filteredEmployees$: Observable<Employee[]>;
  arrayLength: number;
  constructor(private _employeeService: EmployeeService, public dialog: MatDialog, private router: Router,
    private _snackBar: MatSnackBar){ }

  @ViewChild('searchInput') searchInput: ElementRef;
  
  ngOnInit(): void {
    this.employees$ = this._employeeService.getEmployeeListObservable();
    this.filteredEmployees$ = this.employees$;
    this.filteredEmployees$.subscribe(filteredEmployees => {
      this.arrayLength = filteredEmployees.length;
    });
  }
  ngAfterViewInit(): void {
    if (this.searchInput && this.searchInput.nativeElement) {
      fromEvent(this.searchInput.nativeElement, 'input')
        .pipe(
          map((event: Event) => (event.target as HTMLInputElement).value),
          debounceTime(300),
          startWith('')
        )
        .subscribe(searchTerm => this.performSearch(searchTerm));
    }
  }
  performSearch(searchTerm: string): void {
    this.filteredEmployees$ = this.employees$.pipe(
      map((employees: Employee[]) => {
        if (!searchTerm.trim()) {
          return employees; // Show full list when search term is empty
        }
        const lowerCaseSearchTerm = searchTerm.toLowerCase().trim();
        return employees.filter(emp =>
          emp.firstName.toLowerCase().includes(lowerCaseSearchTerm) ||
          emp.lastName.toLowerCase().includes(lowerCaseSearchTerm) ||
          emp.identityNum.toString().toLowerCase().includes(lowerCaseSearchTerm) ||
          emp.startDate.toString().toLowerCase().includes(lowerCaseSearchTerm) ||
          emp.birthDate.toString().toLowerCase().includes(lowerCaseSearchTerm) ||
          emp.jobs.some(job => job.job.name.toLowerCase().includes(lowerCaseSearchTerm))
        );
      })
    );
    this.filteredEmployees$.subscribe(filteredEmployees => {
      this.arrayLength = filteredEmployees.length;
    });
  }

  openDeleteDialog(event: Event, id: number, firstName: string, lastName: string): void {
    event.stopPropagation();
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: { id, firstName, lastName },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this._employeeService.deleteEmployee(id).subscribe();
        this._snackBar.open("Deleted successfully!", "Ok", {
          horizontalPosition: 'left',
          duration: 3000
        })
      }
    });
  }

  editEmployee(event: Event, employee: Employee) {
    event.stopPropagation();
    this._employeeService.employeeToEdit = employee;
    this.router.navigate(['/edit-employee'])
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

  toAdd() {
    this.router.navigate(['/add-employee'])
  }
}
