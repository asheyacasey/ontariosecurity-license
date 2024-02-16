import { TestBed } from '@angular/core/testing';

import { EligibilityTestService } from './eligibility-test.service';

describe('EligibilityTestService', () => {
  let service: EligibilityTestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EligibilityTestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
