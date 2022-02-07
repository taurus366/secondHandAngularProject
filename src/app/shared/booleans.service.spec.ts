import { TestBed } from '@angular/core/testing';

import { BooleansService } from './booleans.service';

describe('BooleansService', () => {
  let service: BooleansService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BooleansService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
