import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilRestauranteComponent } from './perfil-restaurante.component';

describe('PerfilRestauranteComponent', () => {
  let component: PerfilRestauranteComponent;
  let fixture: ComponentFixture<PerfilRestauranteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PerfilRestauranteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PerfilRestauranteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
