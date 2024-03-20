import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LicensingProcessComponent } from './licensing-process.component';

describe('LicensingProcessComponent', () => {
  let component: LicensingProcessComponent;
  let fixture: ComponentFixture<LicensingProcessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LicensingProcessComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LicensingProcessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
