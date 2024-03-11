import { TestBed } from '@angular/core/testing';

import { AboutYouService } from './about-you.service';

describe('AboutYouService', () => {
  let service: AboutYouService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AboutYouService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
