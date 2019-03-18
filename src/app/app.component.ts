import { Component } from '@angular/core';
import { Platform, ModalController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { timer } from 'rxjs/observable/timer';

import { LoginPage } from '../pages/login/login';
import { GeneralControlPage } from '../pages/general-control/general-control';
import { SplashScreen } from '@ionic-native/splash-screen';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  showSplash = true;
  
  rootPage: any = LoginPage;

  constructor(platform: Platform, statusBar: StatusBar, modalCtrl: ModalController, splashScreen: SplashScreen) {
    if (!platform.is('cordova')) {
      this.showSplash = false;
    }
    platform.ready().then(() => {

      statusBar.styleDefault();
      splashScreen.hide();
      timer(4000).subscribe(() => this.showSplash = false)
      
    });
  }
}

