import { TestBed } from '@angular/core/testing';

import { SavingDateServiceService } from './saving-date-service.service';

describe('SavingDateServiceService', () => {
  let service: SavingDateServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SavingDateServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
