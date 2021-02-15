import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CodingLandingComponent } from './coding-landing.component';

describe('CodingLandingComponent', () => {
  let component: CodingLandingComponent;
  let fixture: ComponentFixture<CodingLandingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CodingLandingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CodingLandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
