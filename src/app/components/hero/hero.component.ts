import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, OnChanges, SimpleChanges, Input } from '@angular/core';
import { PersonaResponse } from 'src/app/interfaces/persona-response';
import { PersonaService } from 'src/app/services/persona.service';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss']
})
export class HeroComponent implements OnInit {

  constructor(private personaService: PersonaService) { }

  @Input() persona: PersonaResponse | null = null
  msg: string = ''
  animationMsg: string = ''

  ngOnInit(): void {
    this.getMessage()
  }

  animateMsg(msg: string | null) {
    let index = this.animationMsg.length + 1
    if ((msg + '_') !== this.animationMsg) {
      this.animationMsg.replace('_', '')
      this.animationMsg = this.msg.substring(0, index) + '_'
      if (this.msg.substring(index - 1, index) === ' ') {
        setTimeout(() => {
          window.requestAnimationFrame(() => this.animateMsg(this.msg))
        }, 200)
      } else {
        setTimeout(() => {
          window.requestAnimationFrame(() => this.animateMsg(this.msg))
        }, 125)
      }
    } else {
      this.animationMsg = this.animationMsg.replace('_', '')
    }
  }

  getMessage() {
    this.msg = `Soy Rocío, contadora pública especialista en impuestos y estoy incursionando en el mundo de la programación`
    if (this.msg !== '') {
      window.requestAnimationFrame(() => this.animateMsg(this.msg))
    }
  }

}
