import { TestBed } from '@angular/core/testing';

import { ModuleTimerService } from './module-timer.service';

describe('ModuleTimerService', () => {
  let service: ModuleTimerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModuleTimerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
