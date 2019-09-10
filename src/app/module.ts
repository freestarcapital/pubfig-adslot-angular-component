import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { App } from './app';
import { Demo } from './demo';
import { FreestarAdSlot } from '../components/freestarAdSlot';

@NgModule({
  declarations: [
    App,
    Demo,
    FreestarAdSlot
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [App]
})
export class Module { };
