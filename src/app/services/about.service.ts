import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Paths } from '../enums/paths';
import { AboutRequest } from '../interfaces/about-request';
import { AboutResponse } from '../interfaces/about-response';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class AboutService {

  constructor(private http: HttpClient, private loginService: LoginService) { }

  header: HttpHeaders = new HttpHeaders()

  getAbout(): Observable<AboutResponse> {
    this.header = this.loginService.checkUserlogged(this.header)
    return this.http.get<AboutResponse>(Paths.BASE + Paths.ABOUT, {
      headers: this.header
    })
  }

  createAbout(about: AboutRequest): Observable<AboutResponse> {
    this.header = this.loginService.checkUserlogged(this.header)
    return this.http.post<AboutResponse>(Paths.BASE + Paths.ABOUT, about, {
      headers: this.header
    })
  }

  updateAbout(id: number, form: FormData): Observable<AboutResponse> {
    this.header = this.loginService.checkUserlogged(this.header)
    return this.http.put<AboutResponse>(Paths.BASE + Paths.ABOUT + `/${id}`, form, {
      headers: this.header
    })
  } 

}
