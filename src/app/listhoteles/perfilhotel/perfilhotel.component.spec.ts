import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilhotelComponent } from './perfilhotel.component';

describe('PerfilhotelComponent', () => {
  let component: PerfilhotelComponent;
  let fixture: ComponentFixture<PerfilhotelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PerfilhotelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PerfilhotelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
