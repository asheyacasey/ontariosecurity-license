import { TestBed } from '@angular/core/testing';

import { AdminCourseProgressService } from './admin-course-progress.service';

describe('AdminCourseProgressService', () => {
  let service: AdminCourseProgressService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminCourseProgressService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
