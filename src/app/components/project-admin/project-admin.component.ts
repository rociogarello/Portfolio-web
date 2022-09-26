import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Operacion } from 'src/app/enums/operacion';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { PersonaResponse } from 'src/app/interfaces/persona-response';
import { ProjectResponse } from 'src/app/interfaces/project-response';
import { PersonaService } from 'src/app/services/persona.service';
import { ProjectService } from 'src/app/services/project.service';
import { TechnologyService } from 'src/app/services/technology.service';
import { TechnologyResponse } from 'src/app/interfaces/technology-response';

@Component({
  selector: 'app-project-admin',
  templateUrl: './project-admin.component.html',
  styleUrls: ['./project-admin.component.scss']
})
export class ProjectAdminComponent implements OnInit {

  constructor(
    private projectService: ProjectService, 
    private personaService: PersonaService, 
    public fb: FormBuilder, 
    private technologyService: TechnologyService
    ) {
      this.form = this.fb.group({
        projectName: [''],
        description: [''],
        site: [''],
        file: [null],
        personaId: [null],
        technologiesId: this.fb.array([])
      })
  }

  form: FormGroup
  faplus = faPlus
  isLoading: boolean = false
  projectList: ProjectResponse[] = []
  operacion: Operacion = Operacion.GET
  persona: PersonaResponse | null = null
  projectId: number | null = null
  technologies: TechnologyResponse[] | null = null

  ngOnInit(): void {
    this.getPersona()
    this.getProjects()
    this.getTechnologies()
  }

  get technologiesId() {
    return this.form.controls['technologiesId'] as FormArray
  }

  getTechnologies() {
    this.technologyService.getTechnologies().subscribe({
      next: (data: TechnologyResponse[]) => {
        this.technologies = data
      }
    })
    
  }

  crear() {
    this.form.reset()
    this.operacion = Operacion.POST
  }

  actualizar(project: ProjectResponse) {
    this.form.reset()
    this.form.patchValue({
      ...project,
      personaId: this.persona?.id
    })
    this.projectId = project.id
    this.operacion = Operacion.PUT
  }

  borrar(id: number) {
    this.deleteProjects(id)
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

  getProjects() {
    this.isLoading = true
    this.projectService.getProjectList().subscribe({
      next: (data: ProjectResponse[]) => {
        this.projectList = data
      },
      error: (error: HttpErrorResponse) => {
        this.isLoading = false
      },
      complete: () => {
        this.isLoading = false
      }
    })
  }

  createProject() {
    this.isLoading = true
    let formData = new FormData()
    this.form.patchValue({
      personaId: this.persona?.id
    })
    formData.append('projectName', this.form.get('projectName')?.value)
    formData.append('description', this.form.get('description')?.value)
    formData.append('site', this.form.get('site')?.value)
    formData.append('file', this.form.get('file')?.value)
    formData.append('personaId', this.form.get('personaId')?.value)
    formData.append('technologiesId', this.form.get('technologiesId')?.value)
    this.projectService.createProject(formData).subscribe({
      error: (error: HttpErrorResponse) => {
        this.operacion = Operacion.GET
        this.isLoading = false
      },
      complete: () => {
        this.operacion = Operacion.GET
        this.getProjects()
      }
    })
  }

  updateProject() {
    if (this.projectId === null) {
      this.operacion = Operacion.GET
      return
    } 
    this.isLoading = true
    let formData = new FormData()
    this.form.patchValue({
      personaId: this.persona?.id
    })
    formData.append('projectName', this.form.get('projectName')?.value)
    formData.append('description', this.form.get('description')?.value)
    formData.append('site', this.form.get('site')?.value)
    formData.append('file', this.form.get('file')?.value)
    formData.append('personaId', this.form.get('personaId')?.value)
    formData.append('technologiesId', this.form.get('technologiesId')?.value)
    this.projectService.updateProject(this.projectId, formData).subscribe({
      error: (error: HttpErrorResponse) => {
        this.operacion = Operacion.GET
        this.isLoading = false
      },
      complete: () => {
        this.operacion = Operacion.GET
        this.getProjects()
      }
    })
  }

  deleteProjects(id: number) {
    this.isLoading = true
    this.projectService.deleteProject(id).subscribe({
      error: (error: HttpErrorResponse) => {
        this.operacion = Operacion.GET
        this.isLoading = false
      },
      complete: () => {
        this.operacion = Operacion.GET
        this.getProjects()
      }
    })
  }

  uploadFile(event: any) {
    const file: any = (event.target).files[0]
    this.form.patchValue({
      file: file
    })
    this.form.get('file')?.updateValueAndValidity
  }

  addAndRemoveFromProject(id: number) {
    if (!this.technologiesId.value.includes(id)) {
      this.technologiesId.push(this.fb.control(id))
    } else {
      this.technologiesId.removeAt(this.technologiesId.value.indexOf(id))
    }
  }

}
