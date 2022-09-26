import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobHomeComponent } from './job-home.component';

describe('JobHomeComponent', () => {
  let component: JobHomeComponent;
  let fixture: ComponentFixture<JobHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobHomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
