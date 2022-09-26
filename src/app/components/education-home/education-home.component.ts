import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { EducationResponse } from 'src/app/interfaces/education-response';
import { EducationService } from 'src/app/services/education.service';
import { faGraduationCap } from '@fortawesome/free-solid-svg-icons';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-education-home',
  templateUrl: './education-home.component.html',
  styleUrls: ['./education-home.component.scss']
})
export class EducationHomeComponent implements OnInit {

  constructor() { }
  
  @Input() educationList: EducationResponse[] = []

  graduation = faGraduationCap

  ngOnInit(): void {
  }

  getDate(date: string) {
    const datepipe: DatePipe = new DatePipe('en-US')
    return datepipe.transform(date, 'dd/MM/YYYY')
  }

}
