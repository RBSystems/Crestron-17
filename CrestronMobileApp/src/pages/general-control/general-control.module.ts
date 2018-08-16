import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GeneralControlPage } from './general-control';

@NgModule({
  declarations: [
    GeneralControlPage,
  ],
  imports: [
    IonicPageModule.forChild(GeneralControlPage),
  ],
})
export class GeneralControlPageModule {}
