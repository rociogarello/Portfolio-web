import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Operacion } from 'src/app/enums/operacion';
import { JobRequest } from 'src/app/interfaces/job-request';
import { JobResponse } from 'src/app/interfaces/job-response';
import { PersonaResponse } from 'src/app/interfaces/persona-response';
import { JobService } from 'src/app/services/job.service';
import { PersonaService } from 'src/app/services/persona.service';

@Component({
  selector: 'app-job-admin',
  templateUrl: './job-admin.component.html',
  styleUrls: ['./job-admin.component.scss']
})
export class JobAdminComponent implements OnInit {

  constructor(private jobService: JobService, private personaService: PersonaService) { }

  faplus = faPlus
  isLoading: boolean = false
  jobList: JobResponse[] = []
  jobForm: JobRequest = {
    companyName: '',
    jobDescription: '',
    jobRole: '',
    startDate: null,
    endDate: null,
    personaId: null,
    isPresent: false
  }
  jobId: number | null = null
  persona: PersonaResponse | null = null
  operacion: Operacion = Operacion.GET

  ngOnInit(): void {
    this.getPersona()
    this.getJobs()
  }

  crear() {
    this.reset()
    this.operacion = Operacion.POST
  }

  actualizar(job: JobResponse) {
    this.reset()
    if (this.persona === null) return
    this.jobForm = {
      ...job,
      isPresent: this.jobForm.endDate === '9999-09-09',
      personaId: this.persona.id
    }
    this.jobId = job.id
    this.operacion = Operacion.PUT
  }

  borrar(id: number) {
    this.operacion = Operacion.DELETE
    this.deleteJobs(id) 
  }

  getJobs() {
    this.isLoading = true
    this.jobService.getAllJobs().subscribe({
      next: (data: JobResponse[]) => {
        this.jobList = data
      },
      error: (error: HttpErrorResponse) => {
        this.isLoading = false
      },
      complete: () => {
        this.isLoading = false
      }
    })
  }

  createJobs() {
    this.isLoading = true
    if (this.persona !== null) {
      this.jobForm = {
        ...this.jobForm,
        personaId: this.persona?.id
      }
    }
    this.jobService.createJob(this.jobForm).subscribe({
      error: (error: HttpErrorResponse) => {
        this.isLoading = false
      },
      complete: () => {
        this.operacion = Operacion.GET
        this.getJobs()
      }
    })
  }

  updateJobs() {
    if (this.jobId === null) {
      this.operacion = Operacion.GET
      return
    }
    this.isLoading = true
    if (this.persona !== null) {
      this.jobForm = {
        ...this.jobForm,
        personaId: this.persona?.id
      }
    }
    this.jobService.updateJob(this.jobId, this.jobForm).subscribe({
      error: (error: HttpErrorResponse) => {
        this.operacion = Operacion.GET
        this.isLoading = false
      },
      complete: () => {
        this.operacion = Operacion.GET
        this.getJobs()
      }
    })

  }

  deleteJobs(id: number) {
    this.isLoading = true
    this.jobService.deleteJob(id).subscribe({
      error: (error: HttpErrorResponse) => {
        this.isLoading = false
        this.operacion = Operacion.GET
      },
      complete: () => {
        this.operacion = Operacion.GET
        this.getJobs()
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
        if (this.persona !== null) {
          this.jobForm = {
            ...this.jobForm,
            personaId: this.persona.id
          }
        }
      }
    })
  }

  reset() {
    this.jobForm = {
      companyName: '',
      jobDescription: '',
      jobRole: '',
      startDate: '',
      endDate: '',
      personaId: null,
      isPresent: false
    }
  }

}
