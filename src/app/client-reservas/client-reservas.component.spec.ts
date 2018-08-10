import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientReservasComponent } from './client-reservas.component';

describe('ClientReservasComponent', () => {
  let component: ClientReservasComponent;
  let fixture: ComponentFixture<ClientReservasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientReservasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientReservasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
