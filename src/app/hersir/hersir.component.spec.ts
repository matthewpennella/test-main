import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HersirComponent } from './hersir.component';

describe('HersirComponent', () => {
  let component: HersirComponent;
  let fixture: ComponentFixture<HersirComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HersirComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HersirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
