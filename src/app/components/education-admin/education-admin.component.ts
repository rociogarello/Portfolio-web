import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Operacion } from 'src/app/enums/operacion';
import { EducationRequest } from 'src/app/interfaces/education-request';
import { EducationResponse } from 'src/app/interfaces/education-response';
import { PersonaResponse } from 'src/app/interfaces/persona-response';
import { EducationService } from 'src/app/services/education.service';
import { PersonaService } from 'src/app/services/persona.service';

@Component({
  selector: 'app-education-admin',
  templateUrl: './education-admin.component.html',
  styleUrls: ['./education-admin.component.scss']
})
export class EducationAdminComponent implements OnInit {

  constructor(private educationService: EducationService, private personaService: PersonaService) { }

  faplus = faPlus
  isLoading: boolean = false
  educationList: EducationResponse[] = []
  educationForm: EducationRequest = {
    startDate: new Date(2022, 5, 15).toLocaleDateString('en-CA'),
    endDate: new Date(2022, 5, 16).toLocaleDateString('en-CA'),
    title: '',
    institute: '',
    personaId: null,
    isPresent: false
  }
  educationId: number | null = null
  persona: PersonaResponse | null = null

  operacion: Operacion = Operacion.GET

  ngOnInit(): void {
    this.getPersona()
    this.getEducationList()
  }

  getEducationList() {
    this.isLoading = true
    this.educationService.getEducationList().subscribe({
      next: (data: EducationResponse[]) => {
        this.educationList = data
      },
      error: (error: HttpErrorResponse) => {
        this.isLoading = false
      },
      complete: () => {
        this.isLoading = false
      }
    })
  }

  crear() {
    this.operacion = Operacion.POST
    this.resetForm()
  }

  editar(education: EducationResponse) {
    this.resetForm()
    this.educationId = education.id
    this.educationForm = {
      ...education,
      isPresent: education.endDate === '9999-09-09',
      personaId: null
    }
    this.operacion = Operacion.PUT
  }

  borrar(id: number) {
    this.educationId = id
    this.operacion = Operacion.DELETE
    this.deleteEducation()
  }

  cancelar() {
    this.operacion = Operacion.GET
  }
 
  createEducation() {
    this.isLoading = true
    if (this.persona !== null) {
      this.educationForm = {
        ...this.educationForm,
        personaId: this.persona.id
      }
    }
    this.educationService.createEducation(this.educationForm).subscribe({
      error: (error: HttpErrorResponse) => [
        this.isLoading = false
      ],
      complete: () => {
        this.operacion = Operacion.GET
        this.getEducationList()
      }
    })
  }

  getPersona() {
    this.isLoading = true
    this.personaService.getPersona().subscribe({
      next: (data: PersonaResponse) => {
        this.persona = data
      },
      error: (error: HttpErrorResponse) => {
        this.isLoading = false
      },
      complete: () => {
        this.isLoading = false
        if (this.persona != null) {
          this.educationForm = {
            ...this.educationForm,
            personaId: this.persona.id
          }
        }
      }
    })
  }

  updateEducation() {
    if (this.educationId === null) {
      this.operacion = Operacion.GET
      return
    }
    this.isLoading = true
    this.operacion = Operacion.GET
    if (this.persona != null) {
      this.educationForm = {
        ...this.educationForm,
        personaId: this.persona.id
      }
    }
    this.educationService.updateEducation(this.educationId, this.educationForm).subscribe({
      error: (error: HttpErrorResponse) => {
        this.isLoading = false
      },
      complete: () => {
        this.educationId = null
        this.getEducationList()
      }
    })
  }

  deleteEducation() {
    if (this.educationId === null || this.operacion !== Operacion.DELETE) {
      this.operacion = Operacion.GET
      return
    }
    this.isLoading = true
    this.educationService.deleteEducation(this.educationId).subscribe({
      error: (error: HttpErrorResponse) => {
        this.educationId = null
        this.isLoading = false
      },
      complete: () => {
        this.educationId = null
        this.getEducationList()
      }
    })
  }

  resetForm() {
    this.educationForm = {
      startDate: null,
      endDate: null,
      title: '',
      institute: '',
      personaId: null,
      isPresent: false
    }
  }

}
