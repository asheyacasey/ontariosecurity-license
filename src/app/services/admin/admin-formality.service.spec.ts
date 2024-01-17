import { TestBed } from '@angular/core/testing';

import { AdminFormalityService } from './admin-formality.service';

describe('AdminFormalityService', () => {
  let service: AdminFormalityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminFormalityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
