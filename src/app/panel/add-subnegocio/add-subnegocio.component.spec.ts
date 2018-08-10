import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSubnegocioComponent } from './add-subnegocio.component';

describe('AddSubnegocioComponent', () => {
  let component: AddSubnegocioComponent;
  let fixture: ComponentFixture<AddSubnegocioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddSubnegocioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSubnegocioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
