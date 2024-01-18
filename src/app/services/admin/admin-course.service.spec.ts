import { TestBed } from '@angular/core/testing';

import { AdminCourseService } from './admin-course.service';

describe('AdminCourseService', () => {
  let service: AdminCourseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminCourseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
