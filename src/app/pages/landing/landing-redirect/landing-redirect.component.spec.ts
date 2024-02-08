import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingRedirectComponent } from './landing-redirect.component';

describe('LandingRedirectComponent', () => {
  let component: LandingRedirectComponent;
  let fixture: ComponentFixture<LandingRedirectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LandingRedirectComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LandingRedirectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
