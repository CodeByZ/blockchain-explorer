import { TestBed, inject } from '@angular/core/testing';

import { HealthCheckService } from './health-check.service';

describe('HealthCheckService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HealthCheckService]
    });
  });

  it('should be created', inject([HealthCheckService], (service: HealthCheckService) => {
    expect(service).toBeTruthy();
  }));
});
