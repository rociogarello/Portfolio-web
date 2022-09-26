import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Operacion } from 'src/app/enums/operacion';
import { PersonaRequest } from 'src/app/interfaces/persona-request';
import { PersonaResponse } from 'src/app/interfaces/persona-response';
import { PersonaService } from 'src/app/services/persona.service';

@Component({
  selector: 'app-persona-admin',
  templateUrl: './persona-admin.component.html',
  styleUrls: ['./persona-admin.component.scss']
})
export class PersonaAdminComponent implements OnInit {

  constructor(private personaService: PersonaService) { }

  hidden: string = 'hide'
  isLoading: boolean = false
  operacion: Operacion = Operacion.GET 

  personaForm: PersonaRequest = {
    firstName: '',
    lastName: ''
  }

  persona: PersonaResponse | undefined

  ngOnInit(): void {
    this.getPersona()
  }

  crear() {
    this.operacion = Operacion.POST
  }

  actualizar() {
    if (this.persona !== undefined) {
      this.personaForm = { ...this.persona }
    }
    this.operacion = Operacion.PUT
  }

  getPersona() {
    this.isLoading = true
    this.personaService.getPersona().subscribe({
      next: (data: PersonaResponse) => { 
        this.persona = data
      },
      error: (error: HttpErrorResponse) => {
        if (error.status === 403 && localStorage.getItem('access_token') != null) {
          localStorage.removeItem('access_token')
        }
        this.isLoading = false
      },
      complete: () => {
        this.isLoading = false
      }
    })
  }

  createPersona() {
    this.isLoading = true
    this.personaService.createPersona(this.personaForm).subscribe((data: PersonaResponse) => {
      this.persona = data
      this.operacion = Operacion.GET
      this.isLoading = false
    })
  }

  updatePersona() {
    this.isLoading = true
    if (this.persona === undefined) return
    else this.personaService.updatePersona(this.persona?.id, this.personaForm).subscribe((data: PersonaResponse) => {
      this.persona = data
      this.operacion = Operacion.GET
    })
    this.isLoading = false
  }
}
