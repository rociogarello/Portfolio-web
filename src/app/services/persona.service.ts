import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { LoginService } from './login.service';
import { Paths } from '../enums/paths';
import { PersonaResponse } from '../interfaces/persona-response';
import { PersonaRequest } from '../interfaces/persona-request';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {

  constructor(private http: HttpClient, private loginService: LoginService) {
  }

  token: string = ''
  header: HttpHeaders = new HttpHeaders()

  getPersona(): Observable<PersonaResponse> {
    return this.http.get<PersonaResponse>(Paths.BASE + Paths.PERSONA)
  }

  createPersona(persona: PersonaRequest): Observable<PersonaResponse> {
    this.header = this.loginService.checkUserlogged(this.header)
    return this.http.post<PersonaResponse>(Paths.PERSONA, persona, {
      headers: this.header
    })
  }

  updatePersona(id: number, persona: PersonaRequest): Observable<PersonaResponse> {
   this.header = this.loginService.checkUserlogged(this.header)
    return this.http.put<PersonaResponse>(Paths.BASE + Paths.PERSONA + `/${id}`, persona, {
      headers: this.header
    })
  }
  
  deletePersona(id: number): Observable<VoidFunction> {
    this.loginService.checkUserlogged(this.header)
    return this.http.delete<VoidFunction>(Paths.BASE + Paths.PERSONA + `/${id}`, {
      headers: this.header
    })
  }

}
