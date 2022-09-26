import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TechnologyAdminComponent } from './technology-admin.component';

describe('TechnologyAdminComponent', () => {
  let component: TechnologyAdminComponent;
  let fixture: ComponentFixture<TechnologyAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TechnologyAdminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TechnologyAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
