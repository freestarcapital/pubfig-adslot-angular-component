import { Component,  OnInit } from '@angular/core';

@Component({
  selector: 'demo',
  template: `
    <freestar-ad-slot
      adUnit='{ "placementName": "div-gpt-ad-leaderboard-multi", "slotId": "div-gpt-ad-leaderboard-multi" }'
      classList='m-30 p-15 b-thin-red'
      adRefresh={{adRefreshCount}}
      (messageEmitter)="onMessageHook($event)"
    ></freestar-ad-slot>
    <button (click)='onAdRefresh()'>Trigger Refresh</button>`
})
export class Demo implements OnInit {
  constructor () {}

  ngOnInit () {
    // example of automatically refreshing an ad every 5 seconds a total of 5 times
    const interval = setInterval(() => {
      const maxRefreshes = 5;
      this.adRefreshCount++;
      if (this.adRefreshCount === maxRefreshes) {
        clearInterval(interval);
      }
    }, 5000);
  }

  adRefreshCount = 0;

  // example of manually refreshing an ad
  onAdRefresh () {
    this.adRefreshCount++;
  }

  onMessageHook (message: String) {
    console.log(message);
  }
};
