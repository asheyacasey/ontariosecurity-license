import { TestBed } from '@angular/core/testing';

import { CourseSelectedGuard } from './course-selected.guard';

describe('CourseSelectedGuard', () => {
  let guard: CourseSelectedGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CourseSelectedGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
