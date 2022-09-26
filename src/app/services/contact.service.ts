import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Paths } from '../enums/paths';
import { ContactRequest } from '../interfaces/contact-request';
import { ContactResponse } from '../interfaces/contact-response';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private http: HttpClient, private loginService: LoginService) { }

  header: HttpHeaders = new HttpHeaders()

  getAllContacts(): Observable<ContactResponse[]> {
    this.header = this.loginService.checkUserlogged(this.header)
    return this.http.get<ContactResponse[]>(Paths.BASE + Paths.CONTACT, {
      headers: this.header
    })
  }

  createContact(contact: ContactRequest): Observable<ContactResponse> {
    this.header = this.loginService.checkUserlogged(this.header)
    return this.http.post<ContactResponse>(Paths.BASE + Paths.CONTACT, contact, {
      headers: this.header
    })
  }

  updateContact(id: number, contact: ContactRequest): Observable<ContactResponse> {
    this.header = this.loginService.checkUserlogged(this.header)
    return this.http.put<ContactResponse>(Paths.BASE + Paths.CONTACT + `/${id}`, contact, {
      headers: this.header
    })
  }

  deleteContact(id: number): Observable<VoidFunction> {
    this.header = this.loginService.checkUserlogged(this.header)
    return this.http.delete<VoidFunction>(Paths.BASE + Paths.CONTACT + `/${id}`, {
      headers: this.header
    })
  }


}
