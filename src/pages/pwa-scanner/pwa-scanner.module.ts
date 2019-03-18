import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PwaScannerPage } from './pwa-scanner';

@NgModule({
  declarations: [
    PwaScannerPage,
  ],
  imports: [
    IonicPageModule.forChild(PwaScannerPage),
  ],
})
export class PwaScannerPageModule {}
