import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, catchError, map, tap, throwError } from 'rxjs';
import { Employee } from './employeeModel';
import { PostEmployee } from './postEmployeeModel';


@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  
  private employeeList$: BehaviorSubject<Employee[]> = new BehaviorSubject<Employee[]>([]);
  public employeeToEdit: Employee;

  constructor(private _http: HttpClient) { 
    this.getEmployeesList().subscribe();
  }

  getEmployeesList(): Observable<Employee[]> {
    return this._http.get<Employee[]>('https://localhost:7159/api/Employees')
      .pipe(
        map((response: Employee[]) => {
          this.employeeList$.next(response);
          return response;
        }),
        catchError(error => this.handleError('Error in getting employees list', error))
      );
  }

  addEmployee(newEmployee: PostEmployee): Observable<Employee> {
    return this._http.post<Employee>('https://localhost:7159/api/Employees', newEmployee)
      .pipe(
        map((createdEmployee: Employee) => {
          const currentList = this.employeeList$.getValue();
          currentList.push(createdEmployee);
          this.employeeList$.next(currentList);
          return createdEmployee;
        }),
        catchError(error => this.handleError('Error in adding employees', error))
      );
  }

  updateEmployee(id: number, updatedEmployee: PostEmployee): Observable<Employee> {
    return this._http.put<Employee>(`https://localhost:7159/api/Employees/${id}`, updatedEmployee)
      .pipe(
        map((updatedEmployee: Employee) => {
          const currentList = this.employeeList$.getValue();
          const index = currentList.findIndex(emp => emp.id === updatedEmployee.id);
          if (index !== -1) {
            currentList[index] = updatedEmployee;
            this.employeeList$.next(currentList);
          }
          return updatedEmployee;
        }),
        catchError(error => this.handleError('Error in updating employees', error))
      );
  }

  deleteEmployee(id: number): Observable<void> {
    return this._http.delete<void>(`https://localhost:7159/api/Employees/${id}`)
      .pipe(
        map(() => {
          const currentList = this.employeeList$.getValue();
          const filteredList = currentList.filter(emp => emp.id !== id);
          this.employeeList$.next(filteredList);
        }),
        catchError(error => this.handleError('Error in deleting employee', error))
      );
  }

  private handleError(message: string, error: any): Observable<never> {
    return throwError(error);
  }

  getEmployeeListObservable(): Observable<Employee[]> {
    return this.employeeList$.asObservable();
  }


}



