import { TestBed } from '@angular/core/testing';

import { NoCourseBoughtGuard } from './no-course-bought.guard';

describe('NoCourseBoughtGuard', () => {
  let guard: NoCourseBoughtGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(NoCourseBoughtGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
