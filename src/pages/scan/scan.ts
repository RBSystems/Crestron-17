import { Component } from '@angular/core';
import { App, Platform, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';


import { LoginPage } from '../login/login';
import { PwaScannerPage } from '../pwa-scanner/pwa-scanner';
import { GeneralControlPage } from '../general-control/general-control';
import { ProjectorApiProvider } from '../../providers/projector-api/projector-api';


@Component({
  selector: 'page-scan',
  templateUrl: 'scan.html',
})
export class ScanPage {
  username: string = this.navParams.get("username");
  data: any;
  UsageData: any;

  constructor(private app: App, private platform: Platform, private navCtrl: NavController, private navParams: NavParams, private alertCtrl: AlertController, private toastCtrl: ToastController, private barcodeScanner: BarcodeScanner, private ProjectorApiService: ProjectorApiProvider) {
    
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
            platform.exitApp();
          }
        }]
      });
      alertMessage.present();
    }, 100);

  }

  scanCode() {
    if (this.platform.is('cordova')) {
      this.barcodeScanner.scan().then((barcodeData) => {
        this.ProjectorApiService.getProjectors(barcodeData.text).subscribe(data => {
          if (data != null) {
            this.ProjectorApiService.InsertRoomNum(data.RoomNum, this.username).subscribe(result => console.log("Result:" + result), error => console.log("Error" + error));
            this.ProjectorApiService.getUsage(data.RoomNum).subscribe(UsageData => {
              console.log(UsageData.CurrentlyUsed);
              console.log(UsageData.CurrentUser);
              if (UsageData.CurrentlyUsed == false) {
                this.ProjectorApiService.updateUsage(data.RoomNum, this.username).subscribe(result => console.log("Result:" + result), error => console.log("Error" + error));
                this.app.getRootNav().push(GeneralControlPage, {
                  'username': this.username,
                  'roomID': data.RoomNum,
                  'signalID': data.SymbolID
                });
              } else if (UsageData.CurrentUser == this.username) {
                this.app.getRootNav().push(GeneralControlPage, {
                  'username': this.username,
                  'roomID': data.RoomNum,
                  'signalID': data.SymbolID
                });
              } else {
                let alertMessage = this.alertCtrl.create({
                  title: UsageData.CurrentUser + ' is currently using room ' + data.RoomNum + ' projector, Are you sure you want to access it?',
                  buttons: [{
                    text: 'NO',
                    handler: () => {

                    }
                  },
                  {
                    text: 'YES',
                    handler: () => {
                      this.ProjectorApiService.updateUsage(data.RoomNum, this.username).subscribe(result => console.log("Result:" + result), error => console.log("Error" + error));
                      this.app.getRootNav().push(GeneralControlPage, {
                        'username': this.username,
                        'roomID': data.RoomNum,
                        'signalID': data.SymbolID
                      });
                    }
                  }]
                });
                alertMessage.present();
              }

            })
          }
          else {
            let toastMessage = this.toastCtrl.create({
              message: 'Invalid QRcode',
              duration: 3000,
              position: 'bottom',
              dismissOnPageChange: true
            });

            toastMessage.present();
          }
        })
      })
    } else {
      this.app.getRootNav().push(PwaScannerPage, {
        'username': this.username
      });
    }
    
  }
}
