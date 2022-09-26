import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonaAdminComponent } from './persona-admin.component';

describe('PersonaAdminComponent', () => {
  let component: PersonaAdminComponent;
  let fixture: ComponentFixture<PersonaAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonaAdminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersonaAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
