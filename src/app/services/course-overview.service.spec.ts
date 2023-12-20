import { TestBed } from '@angular/core/testing';

import { CourseOverviewService } from './course-overview.service';

describe('CourseOverviewService', () => {
  let service: CourseOverviewService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CourseOverviewService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
