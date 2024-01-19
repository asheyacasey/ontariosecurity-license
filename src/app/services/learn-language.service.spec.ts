import { TestBed } from '@angular/core/testing';

import { LearnLanguageService } from './learn-language.service';

describe('LearnLanguageService', () => {
  let service: LearnLanguageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LearnLanguageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
