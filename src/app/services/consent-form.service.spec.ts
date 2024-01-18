import { TestBed } from '@angular/core/testing';

import { ConsentFormService } from './consent-form.service';

describe('ConsentFormService', () => {
  let service: ConsentFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConsentFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
