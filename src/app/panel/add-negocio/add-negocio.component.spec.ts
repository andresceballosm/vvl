import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNegocioComponent } from './add-negocio.component';

describe('AddNegocioComponent', () => {
  let component: AddNegocioComponent;
  let fixture: ComponentFixture<AddNegocioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddNegocioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNegocioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
