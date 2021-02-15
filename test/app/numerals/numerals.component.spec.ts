import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NumeralsComponent } from './numerals.component';

describe('NumeralsComponent', () => {
  let component: NumeralsComponent;
  let fixture: ComponentFixture<NumeralsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NumeralsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NumeralsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
