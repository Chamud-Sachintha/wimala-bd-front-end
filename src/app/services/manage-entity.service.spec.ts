import { TestBed } from '@angular/core/testing';

import { ManageEntityService } from './manage-entity.service';

describe('ManageEntityService', () => {
  let service: ManageEntityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManageEntityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
