import { TestBed } from '@angular/core/testing';

import { FunctionsglobalAppService } from './functionsglobal-app.service';

describe('FunctionsglobalAppService', () => {
  let service: FunctionsglobalAppService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FunctionsglobalAppService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
