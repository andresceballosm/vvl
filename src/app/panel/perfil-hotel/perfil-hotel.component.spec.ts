import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilHotelComponent } from './perfil-hotel.component';

describe('PerfilNegocioComponent', () => {
  let component: PerfilHotelComponent;
  let fixture: ComponentFixture<PerfilHotelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PerfilHotelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PerfilHotelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
