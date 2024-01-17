import { TestBed } from '@angular/core/testing';

import { FormalityService } from './formality.service';

describe('FormalityService', () => {
  let service: FormalityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormalityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
