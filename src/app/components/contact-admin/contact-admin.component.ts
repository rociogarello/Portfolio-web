import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Operacion } from 'src/app/enums/operacion';
import { ContactRequest } from 'src/app/interfaces/contact-request';
import { ContactResponse } from 'src/app/interfaces/contact-response';
import { PersonaResponse } from 'src/app/interfaces/persona-response';
import { ContactService } from 'src/app/services/contact.service';
import { PersonaService } from 'src/app/services/persona.service';

@Component({
  selector: 'app-contact-admin',
  templateUrl: './contact-admin.component.html',
  styleUrls: ['./contact-admin.component.scss']
})
export class ContactAdminComponent implements OnInit {

  constructor(private contactService: ContactService, private personaService: PersonaService) { }

  faplus = faPlus
  isLoading: boolean = false
  contactList: ContactResponse[] = []
  contactForm: ContactRequest = {
    description: '',
    contact: '',
    personaId: null
  }
  updateId: number | null = null
  persona: PersonaResponse | null = null
  operacion: Operacion = Operacion.GET

  ngOnInit(): void {
    this.getPersona()
    this.getContacto()
  }

  crear() {
    this.reset()
    this.operacion = Operacion.POST
  }

  editar(contact: ContactResponse) {
    this.contactForm = {
      contact: contact.contact,
      description: contact.description,
      personaId: null
    }
    this.updateId = contact.id
    this.operacion = Operacion.PUT
  }

  borrar(id: number) {
    this.updateId = id
    this.operacion = Operacion.DELETE
    this.contactService.deleteContact(id).subscribe({
      error: (error: HttpErrorResponse) => {
        this.reset()
      },
      complete: () => {
        this.reset()
        this.getContacto()
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
          this.contactForm = {
            ...this.contactForm,
            personaId: this.persona.id
          }
        }
      }
    })
  }

  crearContacto() {
    this.isLoading = true
    if (this.persona != null) {
      this.contactForm = {
        ...this.contactForm,
        personaId: this.persona.id
      }
    }
    this.contactService.createContact(this.contactForm).subscribe({
      error: (error: HttpErrorResponse) => {
        this.isLoading = false
      },
      complete: () => {
        this.getContacto()
        this.reset()
        this.operacion = Operacion.GET
      }
    })
  }

  getContacto() {
    this.isLoading = true
    this.contactService.getAllContacts().subscribe({
      next: (data: ContactResponse[]) => {
        this.contactList = data
      },
      error: (error: HttpErrorResponse) => {
        this.isLoading = false
      },
      complete: () => {
        this.isLoading = false
      }
    })
  }

  actualizarContacto() {
    if (this.updateId === null) return
    this.contactService.updateContact(this.updateId, this.contactForm).subscribe({
      complete: () => {
        this.reset()
        this.operacion = Operacion.GET
        this.getContacto()
      }
    })
  }

  reset() {
    this.updateId = null
    this.contactForm = {
      contact: '',
      description: '',
      personaId: null
    }
  }


}
