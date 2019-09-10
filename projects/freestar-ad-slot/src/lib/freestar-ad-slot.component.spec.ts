import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FreestarAdSlotComponent } from './freestar-ad-slot.component';

describe('FreestarAdSlotComponent', () => {
  let component: FreestarAdSlotComponent;
  let fixture: ComponentFixture<FreestarAdSlotComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FreestarAdSlotComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FreestarAdSlotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
