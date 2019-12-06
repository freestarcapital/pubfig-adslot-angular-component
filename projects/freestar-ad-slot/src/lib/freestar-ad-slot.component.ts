import { Component, OnInit, Input, EventEmitter, Output, SimpleChanges } from '@angular/core';
import { Promise } from 'q';

@Component({
  selector: 'freestar-ad-slot',
  template: `<div class="{{classes()}}" attr.id="{{placementName}}"></div>`
})
export class FreestarAdSlot implements OnInit {

  constructor () {}

  @Input() placementName: string = '';
  @Input() slotId: string = '';
  @Input() targeting: any = [];
  @Input() classList: string = '';
  @Input() channel: string = null;
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

  adSlotIsReady (placementName: string, slotId: string) {
    return placementName && slotId && document.getElementById(placementName);
  }

  classes () {
    return this.classList;
  }

  newAdSlots () {
    this.getFreestar().then((freestar: { newAdSlots: (arg0: { placementName: string; slotId: string; }) => void; }) => {
      // @ts-ignore
      if (this.adSlotIsReady(this.placementName, this.slotId)) {
        // @ts-ignore
        freestar.newAdSlots(this.getAdUnit(), this.channel);
        this.messageEmitter.emit(`new-ad-slots ${this.placementName}`);
      }
    });
  }

  ngOnInit () { }

  ngAfterViewInit () {
    this.newAdSlots();
  }

  getAdUnit () {
    const adUnit:any = {
      placementName: this.placementName,
      slotId: this.slotId
    };
    if (this.targeting.length) {
      adUnit.targeting = this.targeting;
    }
    return adUnit;
  }

  ngOnDestroy () {
    this.getFreestar().then((freestar: { deleteAdSlots: (arg0: { placementName: string; slotId: string; }) => void; }) => {
      // @ts-ignore
      if (this.adSlotIsReady(this.placementName, this.slotId)) {
        // @ts-ignore
        freestar.deleteAdSlots(this.getAdUnit());
        this.messageEmitter.emit(`delete-ad-slots ${this.placementName}`);
      }
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    const { previousValue, currentValue } = changes.adRefresh;
    if (currentValue !== previousValue) {
      this.newAdSlots();
      this.messageEmitter.emit(`ad-refresh ${this.placementName}`);
    }
  }
}
