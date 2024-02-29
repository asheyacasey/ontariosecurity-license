import { TestBed } from '@angular/core/testing';

import { NoAboutYouCompletedGuard } from './no-about-you-completed.guard';

describe('NoAboutYouCompletedGuard', () => {
  let guard: NoAboutYouCompletedGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(NoAboutYouCompletedGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
