import { TestBed } from '@angular/core/testing';

import { CourseProgressOverviewService } from './course-progress-overview.service';

describe('CourseProgressOverviewService', () => {
  let service: CourseProgressOverviewService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CourseProgressOverviewService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
