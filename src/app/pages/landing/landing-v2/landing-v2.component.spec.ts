import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingV2Component } from './landing-v2.component';

describe('LandingV2Component', () => {
  let component: LandingV2Component;
  let fixture: ComponentFixture<LandingV2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LandingV2Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LandingV2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
