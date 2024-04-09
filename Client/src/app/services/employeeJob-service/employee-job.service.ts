import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { EmployeeJob } from '../../models/employeeJobModel';
import { PostEmployeeJobModel } from '../../models/postEmployeeJobModel';

@Injectable({
  providedIn: 'root'
})
export class EmployeeJobService {

  constructor(private _http: HttpClient) { }

  getJobsList(): Observable<EmployeeJob[]> {
    return this._http.get<EmployeeJob[]>('https://localhost:7159/api/EmployeeJobs')
    
  }

  getJobById(id: number): Observable<EmployeeJob> {
    return this._http.get<EmployeeJob>(`https://localhost:7159/api/EmployeeJobs/${id}`)
    
  }
 
  addJob(employeeJob: PostEmployeeJobModel): Observable<any> {
    return this._http.post('https://localhost:7159/api/EmployeeJobs', employeeJob)
      .pipe(
        catchError(this.handleError)
      );
  }

  updateJob(id: number, employeeJob: PostEmployeeJobModel): Observable<any> {
    return this._http.put(`https://localhost:7159/api/EmployeeJobs/${id}`, employeeJob)
    .pipe(
      catchError(this.handleError)
    );
  }

  deleteJob(id: number): Observable<any> {
    return this._http.delete(`https://localhost:7159/api/EmployeeJobs/${id}`)
     
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An error occurred check the job details';
    alert(errorMessage); // Display error message in alert
    return throwError( ()=>errorMessage);
  }
}