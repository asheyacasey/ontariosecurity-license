import { TestBed } from '@angular/core/testing';

import { AdminDiscountCodeService } from './admin-discount-code.service';

describe('AdminDiscountCodeService', () => {
  let service: AdminDiscountCodeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminDiscountCodeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
