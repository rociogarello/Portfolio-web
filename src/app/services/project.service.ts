import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Paths } from '../enums/paths';
import { ProjectRequest } from '../interfaces/project-request';
import { ProjectResponse } from '../interfaces/project-response';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private http: HttpClient, private loginService: LoginService) { }

  header: HttpHeaders = new HttpHeaders()

  getProjectList(): Observable<ProjectResponse[]> {
    this.header = this.loginService.checkUserlogged(this.header)
    return this.http.get<ProjectResponse[]>(Paths.BASE + Paths.PROJECT, {
      headers: this.header
    })
  }

  createProject(project: FormData): Observable<ProjectResponse> {
    this.header = this.loginService.checkUserlogged(this.header)
    return this.http.post<ProjectResponse>(Paths.BASE + Paths.PROJECT, project, {
      headers: this.header
    })
  }

  updateProject(id: number, project: FormData): Observable<ProjectResponse> {
    this.header = this.loginService.checkUserlogged(this.header)
    return this.http.put<ProjectResponse>(Paths.BASE + Paths.PROJECT + `/${id}`, project, {
      headers: this.header
    })
  }

  deleteProject(id: number): Observable<VoidFunction> {
    this.header = this.loginService.checkUserlogged(this.header)
    return this.http.delete<VoidFunction>(Paths.BASE + Paths.PROJECT + `/${id}`, {
      headers: this.header
    })
  }


}
