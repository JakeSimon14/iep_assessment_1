import { TestBed } from '@angular/core/testing';

import { MockContractService } from './mock-contract.service';

describe('MockContractService', () => {
  let service: MockContractService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MockContractService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
