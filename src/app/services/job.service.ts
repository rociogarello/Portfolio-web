import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Paths } from '../enums/paths';
import { JobRequest } from '../interfaces/job-request';
import { JobResponse } from '../interfaces/job-response';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class JobService {

  constructor(private http: HttpClient, private loginService: LoginService) { }

  header: HttpHeaders = new HttpHeaders()

  getAllJobs(): Observable<JobResponse[]> {
    this.header = this.loginService.checkUserlogged(this.header)
    return this.http.get<JobResponse[]>(Paths.BASE + Paths.JOB, {
      headers: this.header
    })
  }

  createJob(job: JobRequest): Observable<JobResponse> {
    this.header = this.loginService.checkUserlogged(this.header)
    return this.http.post<JobResponse>(Paths.BASE + Paths.JOB, job, {
      headers: this.header
    })
  }

  updateJob(id: number, job: JobRequest): Observable<JobResponse> {
    this.header = this.loginService.checkUserlogged(this.header)
    return this.http.put<JobResponse>(Paths.BASE + Paths.JOB + `/${id}`, job, {
      headers: this.header
    })
  }

  deleteJob(id: number): Observable<VoidFunction> {
    this.header = this.loginService.checkUserlogged(this.header)
    return this.http.delete<VoidFunction>(Paths.BASE + Paths.JOB + `/${id}`, {
      headers: this.header
    })
  }

}
