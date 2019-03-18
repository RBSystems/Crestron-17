import { Component } from '@angular/core';
import { App, Platform, NavController, NavParams, AlertController, ToastController, LoadingController, ViewController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { Hotspot, HotspotNetwork, HotspotConnectionInfo } from '@ionic-native/hotspot';
import { NetworkInterface } from '@ionic-native/network-interface';
import { Idle, DEFAULT_INTERRUPTSOURCES } from '@ng-idle/core';
import { Diagnostic } from '@ionic-native/diagnostic';
import { OpenNativeSettings } from '@ionic-native/open-native-settings';
import { BackgroundMode } from '@ionic-native/background-mode';

import { LoginPage } from '../../pages/login/login';
import { ScanPage } from '../scan/scan';
import { LocalNotifications } from '@ionic-native/local-notifications';

import { RemoteControlProvider } from '../../providers/remote-control/remote-control';
import { AuthenticationProvider } from '../../providers/authentication/authentication';
import { ProjectorApiProvider } from '../../providers/projector-api/projector-api';
import { Cordova } from '@ionic-native/core';
declare var WifiWizard: any;
import QRReader from '../../../node_modules/Custom-modules/barcode-scanner-master/app/js/vendor/qrscan.js';

@Component({
  selector: 'page-general-control',
  templateUrl: 'general-control.html'
})

export class GeneralControlPage {

  username: string = this.navParam.get('username');
  roomID: string = this.navParam.get('roomID');
  signalID: string = this.navParam.get('signalID');
  checked: boolean = false;
  data: any;
  UsageData: any;
  timer: any = setInterval(() => {
    this.autoLogout();
  }, 3600000);
 
  timer2: any = setInterval(() => {
    this.CurrentUserOverride();
  }, 5000)

  public PCColor: string = '#70c9e3';
  public ProjectorOnColor: string = '#70c9e3';
  public VGAColor: string = '#70c9e3';
  public ProjectorOffColor: string = '#70c9e3';
  public HDMIColor: string = '#70c9e3';
  public ProjectorMuteColor: string = '#70c9e3';
  public WirelessPresenterColor: string = '#70c9e3';
  public ScreenUpDownColor: string = '#70c9e3';
  public Aux1Color: string = '#70c9e3';
  public PowerColor: string = '#70c9e3';
  public AutoLockColor: string = '#70c9e3';

  constructor(private app: App, private platform: Platform, private navCtrl: NavController, private navParam: NavParams, private alertCtrl: AlertController, private toastCtrl: ToastController, private remoteCtrlService: RemoteControlProvider, private authenticationService: AuthenticationProvider, private ProjectorApiService: ProjectorApiProvider, private geolocation: Geolocation, private hotspot: Hotspot, private networkInterface: NetworkInterface, private idle: Idle, private localNotifications: LocalNotifications, private diagnostic: Diagnostic, private openNativeSettings: OpenNativeSettings, private loadingCtrl: LoadingController, private backgroundMode: BackgroundMode, private viewCtrl: ViewController) {

    this.platform.registerBackButtonAction(() => {
      let alertMessage = this.alertCtrl.create({
        title: 'Do you want to exit the app?',
        buttons: [{
          text: 'NO',
          handler: () => {
          }
        },
        {
          text: 'YES',
          handler: () => {
            this.remoteCtrlService.updateUsageLeave(this.roomID, this.username).subscribe(result => console.log("Result:" + result), error => console.log("Error" + error));
            platform.exitApp();
          }
        }]
      });
      alertMessage.present();
    }, 100);

    this.backgroundMode.enable();
    console.log("Background mode: " + this.backgroundMode.isEnabled());
    this.timer;
    this.timer2;
    this.platform.ready().then(() => {
      this.platform.pause.subscribe(() => {
        console.log('[INFO] App paused general-control.ts page');
        //this.ProjectorApiService.getUsage(this.roomID).subscribe(UsageData => {
        //  if (UsageData.CurrentlyUsed == true && UsageData.CurrentUser == this.username) {
        //    console.log("UsageData.Duration = " + UsageData.Duration);
        //    this.remoteCtrlService.updateUsageLeave(this.roomID, this.username).subscribe(result => console.log("Result:" + result), error => console.log("Error" + error));
        //    document.location.href = 'index.html';
        //  }
        //});
      });
      this.platform.resume.subscribe(() => {
        console.log('[INFO] App resumed general-control.ts page');
      });
    });
  }

  ionViewDidEnter() {
    if (this.platform.is('cordova')) {
      this.diagnostic.isLocationEnabled().then((state) => {
        if (state == false) {
          let alertMessage = this.alertCtrl.create({
            title: 'Please turn on location services to access the projector functions',
            buttons: [{
              text: 'No thanks',
              handler: () => {
              }
            }, {
              text: 'Open Location Settings',
              handler: () => {
                this.openNativeSettings.open('location');
              }
            }]
          });
          alertMessage.present();
          clearInterval(this.timer);
          clearInterval(this.timer2);
          this.navCtrl.pop();
        } else if (state == true) {
          if (this.platform.is('android')) {
            this.geolocation.getCurrentPosition().then(pos => {
              console.log(pos.coords.latitude);
            }).catch(err => {
              console.log("error code: " + err.code);
              console.log("error message: " + err.message);
              let alertMessage = this.alertCtrl.create({
                title: 'Please give this app location access to access the projector functions',
                buttons: [{
                  text: 'OK'
                }]
              });
              alertMessage.present();
              clearInterval(this.timer);
              clearInterval(this.timer2);
              this.navCtrl.pop();
            });
          }
        }
      }).catch(err => console.log("error: " + err));
    }
  }

  ionViewWillEnter() {
    if (!this.platform.is('cordova')) {
      this.ProjectorApiService.getUsage(this.roomID).subscribe(UsageData => {
        console.log("UsageData.CurrentUser = " + UsageData.CurrentUser + "this.username = " + this.username);
        if (UsageData.CurrentUser != this.username) {
          this.app.getRootNav().push(GeneralControlPage, {
            'username': this.username,
            'roomID': this.roomID,
            'signalID': this.signalID
          });
        }
      });
    }
    
  }

  CurrentUserOverride() {
    console.log("Every 5 second");
    console.log("This page is " + this.navCtrl.getActive().name);
      this.ProjectorApiService.getUsage(this.roomID).subscribe(UsageData => {
        console.log("UsageData.CurrentUser = " + UsageData.CurrentUser + "this.username = " + this.username);
        if (UsageData.CurrentUser != this.username) {
          this.backgroundMode.disable();
          console.log("Background mode: " + this.backgroundMode.isEnabled());
          clearInterval(this.timer);
          clearInterval(this.timer2);
          let alertMessage = this.alertCtrl.create({
            title: UsageData.CurrentUser + ' has taken over room ' + this.roomID + ' projector',
            enableBackdropDismiss: false,
            buttons: [{
              text: 'OK',
              handler: () => {
                document.location.href = 'index.html';
              }
            }]
          });
          alertMessage.present();
        }
      });
    
  }

  autoLogout() {
    console.log("Every 1 hour");
    this.remoteCtrlService.updateUsageLeave(this.roomID, this.username).subscribe(result => console.log("Result:" + result), error => console.log("Error" + error));
    this.localNotifications.schedule({
      title: 'Logout Notice',
      text: 'You have been logged out'
    })
    this.app.getRootNav().push(LoginPage);
    this.backgroundMode.disable();
    console.log("Background mode: " + this.backgroundMode.isEnabled());
    clearInterval(this.timer);
    clearInterval(this.timer2);
  }

  activateProjectorFunc(attributeID: string, value: string, Projector_Event: string) {
    let loadingMessage = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loadingMessage.present();
    this.geolocation.getCurrentPosition({ enableHighAccuracy: true, timeout: 3000, maximumAge: 0 }).then(pos => {
      if (this.platform.is('cordova')) {
        if (this.platform.is('android')) {
          this.hotspot.getConnectionInfo().then((wifiInfo: HotspotConnectionInfo) => {
            this.remoteCtrlService.sendRemoteCommand(this.signalID, attributeID, value).subscribe(result => console.log("Result:" + result), error => console.log("Error" + error));
            this.remoteCtrlService.sendEventLog(this.roomID, this.username, Projector_Event, pos.coords.latitude, pos.coords.longitude, wifiInfo.BSSID).subscribe(result => {
              loadingMessage.dismiss();
              console.log("Result:" + result);
            }, error => {
              loadingMessage.dismiss();
              console.log("Error" + error);
              let alertMessage = this.alertCtrl.create({
                title: "Please try either of the following or both:<br>",
                subTitle: "1) Turn on your device's wifi<br>" +
                  "2) Connect to NYP's wifi<br>" +
                  "3) Try again",
                buttons: [{
                  text: 'No thanks',
                  handler: () => {
                  }
                }, {
                  text: 'Open Wifi settings',
                  handler: () => {
                    this.openNativeSettings.open("wifi");
                  }
                }]
              });
              alertMessage.present();
            });
          }).catch(err => {
            console.log("Hotspot pluggin Error: " + err.code);
          });
        }

        if (this.platform.is('ios')) {
          this.diagnostic.isWifiAvailable().then(wifiAvailability => {
            if (wifiAvailability == 1) {
              setTimeout(() => {
                WifiWizard.getCurrentBSSID((bssid: string) => {
                  this.remoteCtrlService.sendRemoteCommand(this.signalID, attributeID, value).subscribe(result => console.log("Result:" + result), error => console.log("Error" + error));
                  this.remoteCtrlService.sendEventLog(this.roomID, this.username, Projector_Event, pos.coords.latitude, pos.coords.longitude, bssid).subscribe(result => {
                    loadingMessage.dismiss();
                    console.log("Result:" + result);
                  }, error => {
                    loadingMessage.dismiss();
                    console.log("Error" + error);
                  });
                }, err => {
                  console.log("Wifiwizard error: " + err)
                });
              }, 2000)
            }

            if (wifiAvailability == 0) {
              loadingMessage.dismiss();
              let alertMessage = this.alertCtrl.create({
                title: "Please try either of the following or all of it:<br>",
                subTitle: "1) Turn on your device's wifi<br>" +
                  "2) Connect to NYP's wifi<br>" +
                  "3) Try again",
                buttons: [{
                  text: 'No thanks',
                  handler: () => {
                  }
                }, {
                  text: 'Open Wifi settings',
                  handler: () => {
                    this.openNativeSettings.open("wifi");
                  }
                }]
              });
              alertMessage.present();
            }
          });

        }
      } else {
        this.remoteCtrlService.sendRemoteCommand(this.signalID, attributeID, value).subscribe(result => console.log("Result:" + result), error => console.log("Error" + error));
        this.remoteCtrlService.sendEventLog(this.roomID, this.username, Projector_Event, pos.coords.latitude, pos.coords.longitude, "ff:ff:ff:ff:ff:ff").subscribe(result => {
          loadingMessage.dismiss();
          console.log("Result:" + result);
        }, error => {
          loadingMessage.dismiss();
          console.log("Error" + error);
          let alertMessage = this.alertCtrl.create({
            title: "Please try either of the following or both:<br>",
            subTitle: "1) Turn on your device's wifi<br>" +
              "2) Connect to NYP's wifi<br>" +
              "3) Try again",
            buttons: [{
              text: 'OK',
              handler: () => {
              }
            }]
          });
          alertMessage.present();
        });
      }
      
    }).catch(err => {
      if (this.platform.is('cordova')) {
        this.diagnostic.isWifiAvailable().then(wifiAvailability => {
          if (wifiAvailability == 0) {
            loadingMessage.dismiss();
            console.log("error code: " + err.code + " Error message: " + err.message);
            let alertMessage = this.alertCtrl.create({
              title: "Please try either of the following or all of it:<br>",
              subTitle: "1) Turn on your device's wifi<br>" +
                "2) Connect to NYP's wifi<br>" +
                "3) Try again",
              buttons: [{
                text: 'No thanks',
                handler: () => {
                }
              }, {
                text: 'Open Wifi settings',
                handler: () => {
                  this.openNativeSettings.open("wifi");
                }
              }]
            });
            alertMessage.present();
          }

          if (wifiAvailability == 1) {
            loadingMessage.dismiss();
          }
        });
      } else {
        loadingMessage.dismiss();
        let alertMessage = this.alertCtrl.create({
          title: "Please try either of the following or all of it:<br>",
          subTitle: "1) Turn on location services if you are using a mobile browser<br>" +
            "2) Give this app access to your location on your browser<br>" +
            "3) Connect to NYP's wifi",
          buttons: [{
            text: 'Ok',
            handler: () => {
            }
          }]
        });
        alertMessage.present();
      }
      
      
    });
  }

  printStatus(content: string) {
    let toastMessage = this.toastCtrl.create({
      message: content,
      duration: 3000,
      position: 'bottom',
      dismissOnPageChange: true
    });

    toastMessage.present();
  }

  turnOn(control: string) {
    control = '#6392ff';
  }

  turnOff(control: string) {
    control = '#70c9e3';
  }

  logOut() {
    let alertMessage = this.alertCtrl.create({
      title: 'Do you want to logout?',
      buttons: [{
        text: 'NO',
        handler: () => {
        }
      },
      {
        text: 'YES',
        handler: () => {
          localStorage.clear();
          this.remoteCtrlService.updateUsageLeave(this.roomID, this.username).subscribe(result => console.log("Result:" + result), error => console.log("Error" + error));
          this.backgroundMode.disable();
          console.log("Background mode: " + this.backgroundMode.isEnabled());
          clearInterval(this.timer);
          clearInterval(this.timer2);
          this.app.getRootNav().push(LoginPage);
          //this.authenticationService.logout().subscribe(
          //  result => {
          //    localStorage.clear();
          //    this.app.getRootNav().push(LoginPage);
          //  },
          //  error => {
              
          //  });
        }
      }]
    });
    alertMessage.present();
  }

  checkBox(e) {
    var isChecked = e.currentTarget.checked;

    if (isChecked === true) {
      this.turnOn(this.PowerColor);
      this.turnOn(this.ProjectorOnColor);
      this.turnOn(this.PCColor);
      this.printStatus("System is on");

      this.activateProjectorFunc("SYSTEM_POWER", "true", "Projector On and Screen Down");
    }
    else {
      this.turnOff(this.PCColor);
      this.turnOff(this.ProjectorOnColor);
      this.turnOff(this.VGAColor);
      this.turnOff(this.ProjectorOffColor);
      this.turnOff(this.HDMIColor);
      this.turnOff(this.ProjectorMuteColor);
      this.turnOff(this.WirelessPresenterColor);
      this.turnOff(this.ScreenUpDownColor);
      this.turnOff(this.Aux1Color);
      this.turnOff(this.PowerColor);
      this.turnOff(this.AutoLockColor);
      this.printStatus("System is off")

      this.activateProjectorFunc("SYSTEM_POWER", "false", "Projector Off and Screen Up");
      
    }
  }

  ProjectorOn() {

    if (this.ProjectorOnColor === '#70c9e3') {
      this.turnOn(this.ProjectorOnColor);
      this.printStatus("Projector is on");

      this.activateProjectorFunc("DISPLAY_POWER", "true", "Projector On");
    }
    else {
      this.printStatus("Projector is already on");
    }
  }

  ProjectorOff() {

    if (this.ProjectorOnColor === '#70c9e3') {
      this.turnOff(this.ProjectorOnColor);
      this.printStatus("Project is off");

      this.activateProjectorFunc("DISPLAY_POWER", "false", "Projector Off");
    }
    else {
      this.printStatus("Project is already off");
    }
  }

  PC() {
    if (this.PCColor === '#70c9e3') {
      this.turnOn(this.PCColor);
      this.turnOff(this.ProjectorOffColor);
      this.turnOff(this.HDMIColor);
      this.turnOff(this.WirelessPresenterColor);
      this.turnOff(this.Aux1Color);
      this.printStatus("PC is on");

      this.activateProjectorFunc("PC", "true", "Switched to PC");
    } else {
      this.printStatus("PC is already on");
    }
  }

  VGA() {
    if (this.ProjectorOffColor === '#70c9e3') {
      this.turnOn(this.VGAColor);
      this.turnOff(this.PCColor);
      this.turnOff(this.HDMIColor);
      this.turnOff(this.WirelessPresenterColor);
      this.turnOff(this.Aux1Color);
      this.printStatus("VGA is on");

      //this.remoteCtrlService.sendRemoteCommand(this.signalID, "VGA%20/%20Visualiser", "true").subscribe(result => console.log("Result:" + result), error => console.log("Error" + error));
      
      //try changing to vga with activateProjectorFunc
      this.activateProjectorFunc("0cdf6517-e3f8-44b7-b475-782122cb3e6b", "true", "Switched to VGA");
      
    } else {

      this.printStatus("VGA is already on");
    }
  }

  ProjectorMute() {

    if (this.ProjectorMuteColor === '#70c9e3') {
      this.turnOn(this.ProjectorMuteColor);
      this.printStatus("Projector is muted");

      this.activateProjectorFunc("5415dc35-3dd0-42ed-b702-38ad1314f983", "true", "Projector is muted");
    } else {
      this.turnOff(this.ProjectorMuteColor);
      this.printStatus("Projector is umuted");

      this.activateProjectorFunc("81a3869b-d6be-4d54-9491-366bc1bda52e ", "true", "Projector is unmuted");
    }

  }

  HDMI() {
    if (this.HDMIColor === '#70c9e3') {
      this.turnOn(this.HDMIColor);
      this.turnOff(this.VGAColor);
      this.turnOff(this.PCColor);
      this.turnOff(this.WirelessPresenterColor);
      this.turnOff(this.Aux1Color);
      this.printStatus("HDMI is on");

      this.activateProjectorFunc("HDMI", "true", "Switched to HDMI");
    } else {
      this.turnOff(this.HDMIColor);
      this.printStatus("HDMI is aready on");
    }
  }

  ScreenUpDown() {

    if (this.ScreenUpDownColor === '#70c9e3') {
      this.turnOn(this.ScreenUpDownColor);
      this.printStatus("Screen is going down");

      this.activateProjectorFunc("c93e210e-91d9-4890-afc6-0de3923b665d", "true", "Screen Down");

    } else {
      this.turnOff(this.ScreenUpDownColor);
      this.printStatus("Screen is going up");

      this.activateProjectorFunc("84b833e7-78bb-43f1-a4a7-4241cec76424 ", "true", "Screen Up");
    }
  }

  WirelessPresenter() {
    if (this.WirelessPresenterColor === '#70c9e3') {
      this.turnOn(this.WirelessPresenterColor);
      this.turnOff(this.VGAColor);
      this.turnOff(this.HDMIColor);
      this.turnOff(this.PCColor);
      this.turnOff(this.Aux1Color);
      this.printStatus("Wireless presenter is on");

      this.activateProjectorFunc("Wireless%20Presenter", "true", "Switched to Wireless Presenter");
      
    } else {
      this.printStatus("Wireless presenter is already on");
    }
  }

  Aux1() {

    if (this.Aux1Color === '#70c9e3') {
      this.turnOn(this.Aux1Color);
      this.turnOff(this.VGAColor);
      this.turnOff(this.HDMIColor);
      this.turnOff(this.WirelessPresenterColor);
      this.turnOff(this.PCColor);
      this.printStatus("Aux is on");

      this.activateProjectorFunc("Aux%201", "true", "Switched to Aux1");
    } else {
      this.printStatus("Aux is already on");
    }
  }

  AutoLock() {
    if (this.AutoLockColor === '#70c9e3') {
      this.turnOn(this.Aux1Color);
      this.printStatus("Autolock is on");
    }
    else {
      this.printStatus("Autolock is already on");
    }
  }

  setVolume(){
    //Add codes to set volume
  }

  //Power() {
  //  if (this.PowerColor === '#70c9e3') {
  //    this.turnOn(this.PCColor);
  //    this.checked = true;
  //    this.printStatus("Power is on");

  //    this.remoteCtrlService.sendRemoteCommand(this.signalID, "SYSTEM_POWER", "true").subscribe(result => console.log("Result:" + result), error => console.log("Error" + error));
  //  }
  //  else {
  //    this.turnOff(this.PCColor);
  //    this.turnOff(this.ProjectorOnColor);
  //    this.turnOff(this.VGAColor);
  //    this.turnOff(this.ProjectorOffColor);
  //    this.turnOff(this.HDMIColor);
  //    this.turnOff(this.ProjectorMuteColor);
  //    this.turnOff(this.WirelessPresenterColor);
  //    this.turnOff(this.ScreenUpDownColor);
  //    this.turnOff(this.Aux1Color);
  //    this.turnOff(this.PowerColor);
  //    this.turnOff(this.AutoLockColor);
  //    this.checked = false;
  //    this.printStatus("Power is off");

  //    this.remoteCtrlService.sendRemoteCommand(this.signalID, "SYSTEM_POWER", "false").subscribe(result => console.log("Result:" + result), error => console.log("Error" + error));
  //  }
  //}

  ionViewWillUnload() {
    console.log('ionViewWillUnload general-ControlPage');
    this.remoteCtrlService.updateUsageLeave(this.roomID, this.username).subscribe(result => console.log("Result:" + result), error => console.log("Error" + error));
    this.backgroundMode.disable();
    console.log("Background mode: " + this.backgroundMode.isEnabled());
    clearInterval(this.timer);
    clearInterval(this.timer2);
  }
}
