import { TestBed } from '@angular/core/testing';

import { HeroesLocaleServiceService } from './heroes-locale-service.service';

describe('HeroesLocaleServiceService', () => {
  let service: HeroesLocaleServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HeroesLocaleServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
