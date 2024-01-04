import { TestBed } from '@angular/core/testing';

import { FormalitiesService } from './formalities.service';

describe('FormalitiesService', () => {
  let service: FormalitiesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormalitiesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
