import { TestBed, inject } from '@angular/core/testing';

import { ModalBoxService } from './modal-box.service';

describe('ModalBoxService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ModalBoxService]
    });
  });

  it('should be created', inject([ModalBoxService], (service: ModalBoxService) => {
    expect(service).toBeTruthy();
  }));
});
