import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { PersonaResponse } from 'src/app/interfaces/persona-response';
import { PersonaService } from 'src/app/services/persona.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private personaService: PersonaService) { }

  persona: PersonaResponse | null = null
  isLoading: boolean = false
  msg: string = ''
  animationMsg: string = ''
  image: any = ''

  ngOnInit(): void {
    this.getPersona()
  }

  getPersona() {
    this.isLoading = true
    this.personaService.getPersona().subscribe({
      next: (data: PersonaResponse) => {
        this.persona = data
      },
      error: (error: HttpErrorResponse) => this.isLoading = false,
      complete: () => this.isLoading = false
    })
  }


}
