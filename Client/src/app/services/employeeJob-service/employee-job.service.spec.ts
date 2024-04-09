import { TestBed } from '@angular/core/testing';

import { EmployeeJobService } from './employee-job.service';

describe('EmployeeJobService', () => {
  let service: EmployeeJobService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmployeeJobService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
