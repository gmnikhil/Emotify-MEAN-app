import { TestBed } from '@angular/core/testing';

import { ProcesshttpmsgService } from './processhttpmsg.service';

describe('ProcesshttpmsgService', () => {
  let service: ProcesshttpmsgService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProcesshttpmsgService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
