import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Job } from './JobModel';

@Injectable({
  providedIn: 'root'
})
export class JobService {

  constructor(private _http: HttpClient) { }

  getJobsList(): Observable<Job[]> {
    return this._http.get<Job[]>('https://localhost:7159/api/Jobs')
  }
  addJob(job: Job) {
    return this._http.post('https://localhost:7159/api/Jobs', job) 
  }
}
