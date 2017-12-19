import { TestBed, inject } from '@angular/core/testing';

import { NuxeoServerService } from './nuxeo-server.service';

describe('NuxeoServerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NuxeoServerService]
    });
  });

  it('should be created', inject([NuxeoServerService], (service: NuxeoServerService) => {
    expect(service).toBeTruthy();
  }));
});
