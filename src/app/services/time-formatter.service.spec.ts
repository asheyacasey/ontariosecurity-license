import { TestBed } from '@angular/core/testing';

import { TimeFormatterService } from './time-formatter.service';

describe('TimeFormatterService', () => {
  let service: TimeFormatterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TimeFormatterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
