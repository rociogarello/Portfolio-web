import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  constructor(private router: Router) { }
 
  ngOnInit(): void {
  }

  login() {
    this.router.navigate(['login'])
  }

  deslogear() {
    localStorage.removeItem('access_token')
    this.router.navigate(['login'])
  }

  logeado() {
    return localStorage.getItem('access_token') != null
  }

  adminUrl() {
    return this.router.url === '/admin'
  }

  administrar() {
    this.router.navigate(['admin'])
  }

 
}
