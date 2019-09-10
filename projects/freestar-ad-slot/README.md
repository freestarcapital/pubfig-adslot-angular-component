# Freestar Pubfig Ad Slot Angular Component

### Install

```sh
npm install --save @freestar/pubfig-adslot-angular-component
```

### Usage

```js
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { App } from './app';
import { FreestarAdSlot } from '@freestar/pubfig-adslot-angular-component';

@NgModule({
  declarations: [
    App,
    FreestarAdSlot
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [App]
})
export class Module { };

import { Component,  OnInit } from '@angular/core';

@Component({
  selector: 'demo',
  template: `
    <freestar-ad-slot
      placementName='div-gpt-ad-leaderboard-multi'
      slotId='div-gpt-ad-leaderboard-multi'
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
```

### Props

**placementName**
A *required* string of the ad unit's `placementName`.

**slotId**
A *required* string of the ad unit's `slotId`.

**classList**
An *optional* string representing any additional classes that should be applied to the wrapper dom element of the ad slot.

**adRefresh**
An *optional* number bound to the ad refresh. You can increment this value to trigger a refresh of the ad slot.
