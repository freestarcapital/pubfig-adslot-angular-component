import { Component, OnInit, Input, EventEmitter, Output, SimpleChanges } from '@angular/core';
import { Promise } from 'q';

@Component({
  selector: 'freestar-ad-slot',
  template: `<div class="{{classes()}}" attr.id="{{adUnit.placementName}}"></div>`
})
export class FreestarAdSlot implements OnInit {

  constructor () {}

  @Input() adUnit: string = '';
  @Input() classList: string = '';
  @Input() adRefresh: Number = 0;
  @Output() messageEmitter = new EventEmitter<string>();

  getFreestar () {
    return new Promise((resolve: (arg0: any) => void, reject: (arg0: string) => void) => {
      const maxTries = 10;
      let retryCount = 0;
      const waitForFreestarReady = setInterval(() => {
        // @ts-ignore
        if (window.freestar && window.googletag && window.googletag.apiReady) {
          clearInterval(waitForFreestarReady);
          // @ts-ignore
          resolve(window.freestar);
        } else if (retryCount === maxTries) {
          clearInterval(waitForFreestarReady);
          reject(`freestar NOT ready after ${maxTries} tries`);
        } else {
          retryCount++;
        }
      }, 10);
    });
  }

  adSlotIsReady ({ placementName, slotId }) {
    return placementName && slotId && document.getElementById(placementName);
  }

  classes () {
    return this.classList;
  }

  newAdSlots () {
    this.getFreestar().then((freestar: { newAdSlots: (arg0: { placementName: string; slotId: string; }) => void; }) => {
      // @ts-ignore
      if (this.adSlotIsReady(this.adUnit)) {
        // @ts-ignore
        freestar.newAdSlots(this.adUnit);
        this.messageEmitter.emit(`new-ad-slots ${JSON.stringify(this.adUnit)}`);
      }
    });
  }

  ngOnInit () {
    this.adUnit = JSON.parse(this.adUnit);
  }

  ngAfterViewInit () {
    this.newAdSlots();
  }

  ngOnDestroy () {
    this.getFreestar().then((freestar: { deleteAdSlots: (arg0: { placementName: string; slotId: string; }) => void; }) => {
      // @ts-ignore
      if (this.adSlotIsReady(this.adUnit)) {
        // @ts-ignore
        freestar.deleteAdSlots(this.adUnit);
        this.messageEmitter.emit(`delete-ad-slots ${JSON.stringify(this.adUnit)}`);
      }
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    const { previousValue, currentValue } = changes.adRefresh;
    if (currentValue !== previousValue) {
      this.newAdSlots();
      this.messageEmitter.emit(`ad-refresh ${JSON.stringify(this.adUnit)}`)
    }
  }
}
