import { Component, OnInit } from '@angular/core';
import { TechnologyResponse } from 'src/app/interfaces/technology-response';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Operacion } from 'src/app/enums/operacion';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TechnologyRequest } from 'src/app/interfaces/technology-request';
import { TechnologyService } from 'src/app/services/technology.service';
import { PersonaService } from 'src/app/services/persona.service';
import { PersonaResponse } from 'src/app/interfaces/persona-response';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-technology-admin',
  templateUrl: './technology-admin.component.html',
  styleUrls: ['./technology-admin.component.scss']
})
export class TechnologyAdminComponent implements OnInit {

  constructor(private technologyService: TechnologyService, private personaService: PersonaService, public fb: FormBuilder) {
    this.form = this.fb.group({
      file: [null],
      technologyName: [''],
      technologyLevel: [0],
      personaId: [null]
    })
  }

  form: FormGroup
  faplus = faPlus
  isLoading: boolean = false
  technologyList: TechnologyResponse[] = []
  technologyId: number | null = null
  persona: PersonaResponse | null = null
  operacion: Operacion = Operacion.GET

  ngOnInit(): void {
    this.getPersona()
    this.getTechnologyList()
  }

  crear() {
    this.form.reset()
    this.operacion = Operacion.POST
  }

  editar(technology: TechnologyResponse) {
    this.form.patchValue({
      ...technology,
      personaId: this.persona?.id
    })
    this.technologyId = technology.id
    this.operacion = Operacion.PUT
  }

  borrar(id: number) {
    this.deleteTechnology(id)
  }

  getImagen(imagen: string) {
    if (imagen != null) {
      return `data:image/jpeg;base64,${imagen}`
    }
    return null
  }

  uploadFile(event: any) {
    const file: any = (event.target).files[0]
    this.form.patchValue({
      file: file
    })
    this.form.get('file')?.updateValueAndValidity
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
      }
    })
  }

  getTechnologyList() {
    this.isLoading = true
    this.technologyService.getTechnologies().subscribe({
      next: (data: TechnologyResponse[]) => {
        this.technologyList = data
      },
      error: (error: HttpErrorResponse) => {
        this.isLoading = false
      },
      complete: () => {
        this.isLoading = false
      }
    })

  }

  createTechnology() {
    this.isLoading = true
    this.operacion = Operacion.GET
    let formData = new FormData()
    this.form.patchValue({
      personaId: this.persona?.id
    })
    formData.append('file', this.form.get('file')?.value)
    formData.append('technologyName', this.form.get('technologyName')?.value)
    formData.append('technologyLevel', this.form.get('technologyLevel')?.value)
    formData.append('personaId', this.form.get('personaId')?.value)
    this.technologyService.createTechnology(formData).subscribe({
      error: (error: HttpErrorResponse) => {
        this.isLoading = false
      },
      complete: () => {
        this.getTechnologyList()
      }
    })
  }

  updateTechnology() {
    if (this.technologyId === null) {
      this.operacion = Operacion.GET
      return
    }
    this.isLoading = true
    this.operacion = Operacion.GET
    let formData = new FormData()
    formData.append('technologyName', this.form.get('technologyName')?.value) 
    formData.append('technologyLevel', this.form.get('technologyLevel')?.value) 
    formData.append('personaId', this.form.get('personaId')?.value) 
    formData.append('file', this.form.get('file')?.value) 
    this.technologyService.updateTechnology(this.technologyId, formData).subscribe({
      error: (error: HttpErrorResponse) => {
        this.isLoading = false
      },
      complete: () => {
        this.getTechnologyList()
      }
    })
  }

  deleteTechnology(id: number) {
    this.isLoading = true
    this.technologyService.deleteTechnology(id).subscribe({
      error: (error: HttpErrorResponse) => {
        this.isLoading = false
      },
      complete: () => {
        this.getTechnologyList()
        this.operacion = Operacion.GET
      }
    })
  }

}
