import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { AboutResponse } from 'src/app/interfaces/about-response';
import { AboutService } from 'src/app/services/about.service';
import { faAddressCard } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-about-home',
  templateUrl: './about-home.component.html',
  styleUrls: ['./about-home.component.scss']
})
export class AboutHomeComponent implements OnInit {

  @Input() about: AboutResponse | null = null
  aboutUs = faAddressCard

  constructor() { }

  ngOnInit(): void {
  }

  getImage(image: any) {
    if (image != null) {
      return 'data:image/jpeg;base64,' + image
    } 
    return null
  }


}
