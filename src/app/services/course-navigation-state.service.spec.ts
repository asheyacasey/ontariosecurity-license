import { TestBed } from '@angular/core/testing';

import { CourseNavigationStateService } from './course-navigation-state.service';

describe('CourseStateService', () => {
  let service: CourseNavigationStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CourseNavigationStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
