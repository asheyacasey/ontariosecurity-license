import { TestBed } from '@angular/core/testing';

import { BillingDetailsService } from './billing-details.service';

describe('BillingDetailsService', () => {
  let service: BillingDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BillingDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
