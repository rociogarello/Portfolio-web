import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Paths } from '../enums/paths';
import { LoginService } from './login.service';
import { TechnologyResponse } from '../interfaces/technology-response';
import { TechnologyRequest } from '../interfaces/technology-request';

@Injectable({
  providedIn: 'root'
})
export class TechnologyService {

  constructor(private http: HttpClient, private loginService: LoginService) { }

  header: HttpHeaders = new HttpHeaders()

  getTechnologies(): Observable<TechnologyResponse[]> {
    this.header = this.loginService.checkUserlogged(this.header)
    return this.http.get<TechnologyResponse[]>(Paths.BASE + Paths.TECHNOLOGY, {
      headers: this.header
    })
  }

  createTechnology(technology: FormData): Observable<TechnologyResponse> {
    this.header = this.loginService.checkUserlogged(this.header)
    return this.http.post<TechnologyResponse>(Paths.BASE + Paths.TECHNOLOGY, technology, {
      headers: this.header
    })
  }

  updateTechnology(id: number, technology: FormData): Observable<TechnologyResponse> {
    this.header = this.loginService.checkUserlogged(this.header)
    return this.http.put<TechnologyResponse>(Paths.BASE + Paths.TECHNOLOGY + `/${id}`, technology, {
      headers: this.header
    })
  }

  deleteTechnology(id: number): Observable<VoidFunction> {
    this.header = this.loginService.checkUserlogged(this.header)
    return this.http.delete<VoidFunction>(Paths.BASE + Paths.TECHNOLOGY + `/${id}`, {
      headers: this.header
    })
  }

}
