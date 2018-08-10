import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditHabitacionComponent } from './edit-habitacion.component';

describe('EditHabitacionComponent', () => {
  let component: EditHabitacionComponent;
  let fixture: ComponentFixture<EditHabitacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditHabitacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditHabitacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
