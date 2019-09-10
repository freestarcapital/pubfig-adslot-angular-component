import { TestBed } from '@angular/core/testing';

import { FreestarAdSlotService } from './freestar-ad-slot.service';

describe('FreestarAdSlotService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FreestarAdSlotService = TestBed.get(FreestarAdSlotService);
    expect(service).toBeTruthy();
  });
});
