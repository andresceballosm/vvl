import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilHabitacionComponent } from './perfil-habitacion.component';

describe('PerfilHabitacionComponent', () => {
  let component: PerfilHabitacionComponent;
  let fixture: ComponentFixture<PerfilHabitacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PerfilHabitacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PerfilHabitacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
