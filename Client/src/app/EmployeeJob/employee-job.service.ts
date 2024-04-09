import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EmployeeJob } from './employeeJobModel';
import { PostEmployeeJobModel } from './postEmployeeJobModel';



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
 
  addJob(employeeJob: PostEmployeeJobModel) {
    return this._http.post('https://localhost:7159/api/EmployeeJobs', employeeJob) 
  }

  updateJob(id:number, employeeJob: PostEmployeeJobModel)
  {
    return this._http.put(`https://localhost:7159/api/EmployeeJobs/${id}`, employeeJob)
  }

  deleteJob(id:number)
  {
    return this._http.delete(`https://localhost:7159/api/EmployeeJobs/${id}`)
  }


}
