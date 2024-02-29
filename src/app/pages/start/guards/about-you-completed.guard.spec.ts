import { TestBed } from '@angular/core/testing';

import { AboutYouCompletedGuard } from './about-you-completed.guard';

describe('AboutYouCompletedGuard', () => {
  let guard: AboutYouCompletedGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AboutYouCompletedGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
