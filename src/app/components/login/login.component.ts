import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginRequest } from 'src/app/interfaces/login-request';
import { LoginResponse } from 'src/app/interfaces/login-response';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private loginService: LoginService, private router: Router) { }

  login: LoginRequest = {
    username: '',
    password: ''
  }

  token: string = ''

  ngOnInit(): void {
  }

  loginUser() {
    this.loginService.login(this.login).subscribe({
      next: (data: LoginResponse) => this.token = `Bearer ${data.jwt}`,
      complete: () => {
        this.saveToken()
        this.router.navigate(['/admin'])
      }
    })
  }

  saveToken() {
    if (localStorage.getItem('access_token') != null) localStorage.removeItem('access_token')
    localStorage.setItem('access_token', this.token)
  }

}
