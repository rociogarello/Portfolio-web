import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Operacion } from 'src/app/enums/operacion';
import { AboutResponse } from 'src/app/interfaces/about-response';
import { PersonaResponse } from 'src/app/interfaces/persona-response';
import { AboutService } from 'src/app/services/about.service';
import { PersonaService } from 'src/app/services/persona.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-about-admin',
  templateUrl: './about-admin.component.html',
  styleUrls: ['./about-admin.component.scss']
})
export class AboutAdminComponent implements OnInit {

  constructor(private aboutService: AboutService, private personaService: PersonaService, public fb: FormBuilder, private router: Router) {
    this.form = this.fb.group({
      title: [this.about?.title],
      about: [this.about?.about],
      file: [null],
      personaId: [null]
    })
  }

  form: FormGroup

  faplus = faPlus

  isLoading: boolean = false

  errorMsg: string | null = null

  persona: PersonaResponse | null = null

  about: AboutResponse | null = null

  operacion: Operacion = Operacion.GET

  ngOnInit(): void {
    this.getPersona()
    this.getAbout()
  }

  uploadFile(event: any) {
    const file: any = (event.target).files[0]; 
    this.form.patchValue({
      file: file
    })
    this.form.get('file')?.updateValueAndValidity()
  }

  getAbout() {
    this.isLoading = true
    this.aboutService.getAbout().subscribe({
      next: (data: AboutResponse) => {
        this.about = data
        this.isLoading = false
        if (this.about.image !== null) {
          this.about = {
            ...this.about,
            image: 'data:image/jpeg;base64,' + this.about.image
          }
        }
        this.form.patchValue({
          title: this.about.title,
          about: this.about.about,
        })
      },
      error: (error: HttpErrorResponse) => {
        if (error.status === 403 && localStorage.getItem('access_token') != null) {
          localStorage.removeItem('access_token')
        }
        this.router.navigate(['/login'])
        this.isLoading = false
      },
      complete: () => {
        this.isLoading = false
      }
    })
  }

  actualizar() {
    this.operacion = Operacion.PUT
  }

  getPersona() {
    this.isLoading = true
    this.personaService.getPersona().subscribe({
      next: (data: PersonaResponse) => {
        this.persona = data
        this.form.patchValue({
          personaId: this.persona.id
        })
      },
      error: (error: HttpErrorResponse) => {
        this.isLoading = false
      },
      complete: () => {
        this.isLoading = false
      }
    })
  }

  actualizarAbout() {
    if (this.about === null) return
    this.isLoading = true
    this.operacion = Operacion.GET
    let formData = new FormData()
    formData.append('title', this.form.get('title')?.value)
    formData.append('about', this.form.get('about')?.value)
    formData.append('file', this.form.get('file')?.value)
    formData.append('personaId', this.form.get('personaId')?.value)
    this.aboutService.updateAbout(this.about.id, formData).subscribe({
      error: (error: HttpErrorResponse) => this.isLoading = false,
      complete: () => {
        this.getAbout()
      }
    })
  }

}
