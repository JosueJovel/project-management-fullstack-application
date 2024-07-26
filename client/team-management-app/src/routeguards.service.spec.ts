import { TestBed } from '@angular/core/testing';

import { RouteguardsService } from './routeguards.service';

describe('RouteguardsService', () => {
  let service: RouteguardsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RouteguardsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
