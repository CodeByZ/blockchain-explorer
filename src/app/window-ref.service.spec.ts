import { TestBed, inject } from '@angular/core/testing';

import {WindowRefService} from './window-ref.service';

describe('WindowRefServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WindowRefService]
    });
  });

  it('should be created', inject([WindowRefService], (service: WindowRefService) => {
    expect(service).toBeTruthy();
  }));
});
