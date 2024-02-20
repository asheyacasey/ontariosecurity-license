import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobOffersCountComponent } from './job-offers-count.component';

describe('JobOffersCountComponent', () => {
  let component: JobOffersCountComponent;
  let fixture: ComponentFixture<JobOffersCountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobOffersCountComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobOffersCountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
