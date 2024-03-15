import { TestBed } from '@angular/core/testing';

import { TutoringService } from './tutoring.service';

describe('TutoringService', () => {
  let service: TutoringService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TutoringService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
