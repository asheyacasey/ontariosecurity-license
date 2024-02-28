import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhyModuleLockedButtonComponent } from './why-module-locked-button.component';

describe('WhyModuleLockedButtonComponent', () => {
  let component: WhyModuleLockedButtonComponent;
  let fixture: ComponentFixture<WhyModuleLockedButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WhyModuleLockedButtonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WhyModuleLockedButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
