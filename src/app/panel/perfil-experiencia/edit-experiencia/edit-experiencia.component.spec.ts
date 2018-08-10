import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditExperienciaComponent } from './edit-experiencia.component';

describe('EditExperienciaComponent', () => {
  let component: EditExperienciaComponent;
  let fixture: ComponentFixture<EditExperienciaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditExperienciaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditExperienciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
