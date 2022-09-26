import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Paths } from '../enums/paths';
import { EducationRequest } from '../interfaces/education-request';
import { EducationResponse } from '../interfaces/education-response';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class EducationService {

  constructor(private http: HttpClient, private loginService: LoginService) { }

  header: HttpHeaders = new HttpHeaders()

  getEducationList(): Observable<EducationResponse[]> {
    this.header = this.loginService.checkUserlogged(this.header)
    return this.http.get<EducationResponse[]>(Paths.BASE + Paths.EDUCATION, {
      headers: this.header
    })
  }

  createEducation(education: EducationRequest): Observable<EducationResponse> {
    this.header = this.loginService.checkUserlogged(this.header)
    return this.http.post<EducationResponse>(Paths.BASE + Paths.EDUCATION, education, {
      headers: this.header
    })
  }

  updateEducation(id: number, education: EducationRequest): Observable<EducationResponse> {
    this.header = this.loginService.checkUserlogged(this.header)
    return this.http.put<EducationResponse>(Paths.BASE + Paths.EDUCATION + `/${id}`, education, {
      headers: this.header
    })
  }

  deleteEducation(id: number): Observable<VoidFunction> {
    this.header = this.loginService.checkUserlogged(this.header)
    return this.http.delete<VoidFunction>(Paths.BASE + Paths.EDUCATION + `/${id}`, {
      headers: this.header
    })
  }

}
