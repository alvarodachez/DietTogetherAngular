import { TestBed } from '@angular/core/testing';

import { RegimeService } from './regime.service';

describe('RegimeService', () => {
  let service: RegimeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegimeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
