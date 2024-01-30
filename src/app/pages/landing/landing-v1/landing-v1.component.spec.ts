import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingV1Component } from './landing-v1.component';

describe('LandingComponent', () => {
  let component: LandingV1Component;
  let fixture: ComponentFixture<LandingV1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LandingV1Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LandingV1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
