import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListhotelesComponent } from './listhoteles.component';

describe('ListhotelesComponent', () => {
  let component: ListhotelesComponent;
  let fixture: ComponentFixture<ListhotelesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListhotelesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListhotelesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
