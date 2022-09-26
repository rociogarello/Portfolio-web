import { Component, Input, OnInit } from '@angular/core';
import { JobResponse } from 'src/app/interfaces/job-response';
import { faBriefcase } from '@fortawesome/free-solid-svg-icons';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-job-home',
  templateUrl: './job-home.component.html',
  styleUrls: ['./job-home.component.scss']
})
export class JobHomeComponent implements OnInit {

  constructor() { }

  @Input() jobs: JobResponse[] = []

  briefcase = faBriefcase

  ngOnInit(): void {
  }
  
  datepipe: DatePipe = new DatePipe('en-EN')
  
  getDate(date: string) {
    return this.datepipe.transform(date, 'dd/MM/YYYY')
  }


}
