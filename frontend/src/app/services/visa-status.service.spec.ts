import { TestBed } from '@angular/core/testing';

import { VisaStatusService } from './visa-status.service';

describe('VisaStatusService', () => {
  let service: VisaStatusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VisaStatusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
