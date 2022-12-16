import { TestBed } from '@angular/core/testing';

import { ManageStockItemService } from './manage-stock-item.service';

describe('ManageStockItemService', () => {
  let service: ManageStockItemService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManageStockItemService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
