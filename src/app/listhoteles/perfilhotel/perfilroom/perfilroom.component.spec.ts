import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilroomComponent } from './perfilroom.component';

describe('PerfilroomComponent', () => {
  let component: PerfilroomComponent;
  let fixture: ComponentFixture<PerfilroomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PerfilroomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PerfilroomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
