import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPlatoComponent } from './edit-plato.component';

describe('EditPlatoComponent', () => {
  let component: EditPlatoComponent;
  let fixture: ComponentFixture<EditPlatoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditPlatoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPlatoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
