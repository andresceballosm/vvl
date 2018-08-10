import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilPlatoComponent } from './perfil-plato.component';

describe('PerfilPlatoComponent', () => {
  let component: PerfilPlatoComponent;
  let fixture: ComponentFixture<PerfilPlatoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PerfilPlatoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PerfilPlatoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
