import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { Geolocation } from '@ionic-native/geolocation';
import { Hotspot, HotspotNetwork } from '@ionic-native/hotspot';
import { NetworkInterface } from '@ionic-native/network-interface';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { Diagnostic } from '@ionic-native/diagnostic';
import { OpenNativeSettings } from '@ionic-native/open-native-settings';
import { BackgroundMode } from '@ionic-native/background-mode';

import { MyApp } from './app.component';
import { LoginPage } from '../pages/login/login';
import { ScanPage } from '../pages/scan/scan';
import { GeneralControlPage } from '../pages/general-control/general-control';
import { PwaScannerPage } from '../pages/pwa-scanner/pwa-scanner';

import { RemoteControlProvider } from '../providers/remote-control/remote-control';
import { AuthenticationProvider } from '../providers/authentication/authentication';
import { ProjectorApiProvider } from '../providers/projector-api/projector-api'
import { NgIdleModule } from '@ng-idle/core/src/module';
import { NgIdleKeepaliveModule } from '@ng-idle/keepalive';

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    ScanPage,
    GeneralControlPage,
    PwaScannerPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule, 
    HttpModule,
    IonicModule.forRoot(MyApp),
    NgIdleKeepaliveModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    ScanPage,
    GeneralControlPage,
    PwaScannerPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    BarcodeScanner,
   {provide: ErrorHandler, useClass: IonicErrorHandler},
    RemoteControlProvider,
    AuthenticationProvider,
    ProjectorApiProvider,
    Geolocation,
    Hotspot,
    NetworkInterface,
    LocalNotifications,
    Diagnostic,
    OpenNativeSettings,
    BackgroundMode
  ]
})
export class AppModule {}
