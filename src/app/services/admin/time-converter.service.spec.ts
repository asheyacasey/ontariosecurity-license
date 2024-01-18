import { TestBed } from '@angular/core/testing';

import { TimeConverterService } from './time-converter.service';

describe('TimeConverterService', () => {
  let service: TimeConverterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TimeConverterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
