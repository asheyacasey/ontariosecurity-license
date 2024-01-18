import { TestBed } from '@angular/core/testing';

import { AdminPaymentService } from './admin-payment.service';

describe('AdminPaymentsService', () => {
  let service: AdminPaymentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminPaymentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
