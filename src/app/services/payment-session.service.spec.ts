import { TestBed } from '@angular/core/testing';

import { PaymentSessionService } from './payment-session.service';

describe('PaymentSessionService', () => {
  let service: PaymentSessionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PaymentSessionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
