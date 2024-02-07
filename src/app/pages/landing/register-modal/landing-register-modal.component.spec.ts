import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingRegisterModalComponent } from './landing-register-modal.component';

describe('RegisterModalComponent', () => {
  let component: LandingRegisterModalComponent;
  let fixture: ComponentFixture<LandingRegisterModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LandingRegisterModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LandingRegisterModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
