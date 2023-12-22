import { TestBed } from '@angular/core/testing';

import { CoursePaymentStartedGuard } from './course-payment-started.guard';

describe('CoursePaymentStartedGuard', () => {
  let guard: CoursePaymentStartedGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CoursePaymentStartedGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
