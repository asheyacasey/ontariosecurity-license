import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhyModuleLockedModalComponent } from './why-module-locked-modal.component';

describe('WhyModuleLockedModalComponent', () => {
  let component: WhyModuleLockedModalComponent;
  let fixture: ComponentFixture<WhyModuleLockedModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WhyModuleLockedModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WhyModuleLockedModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
