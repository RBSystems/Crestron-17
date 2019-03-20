import { Component } from '@angular/core';
import { Platform, IonicPage, NavController, NavParams, AlertController, LoadingController, ToastController } from 'ionic-angular';
import { Diagnostic } from '@ionic-native/diagnostic';
import { OpenNativeSettings } from '@ionic-native/open-native-settings';

import { ScanPage } from '../scan/scan';
import { AuthenticationProvider } from '../../providers/authentication/authentication';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})

export class LoginPage {

  username: string;
  password: string;
  loginData = { username: '', password: '' };
  data: any;

  constructor(private platform: Platform, private navCtrl: NavController, private navParams: NavParams, private alertCtrl: AlertController, private loadingCtrl: LoadingController, private toastCtrl: ToastController, private authenticationService: AuthenticationProvider, private diagnostic: Diagnostic, private openNativeSettings: OpenNativeSettings) {

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

  doLogin() {

    let loadingMessage = this.loadingCtrl.create({
      content: 'Authenticating...'
    });
    loadingMessage.present();
    if (this.platform.is('cordova')) {
      console.log(this.platform.is('cordova') + " is cordova");
      this.diagnostic.isWifiAvailable().then(wifiAvailability => {
        if (wifiAvailability == 1) {
          setTimeout(() => {
            this.authenticationService.login(this.loginData).subscribe(result => {
              loadingMessage.dismiss();
              this.data = result;
              localStorage.setItem('token', this.data.access_token);
              this.navCtrl.setRoot(ScanPage,
                {
                  'username': this.loginData.username
                });
            }, error => {
              loadingMessage.dismiss();
              let toastMessage = this.toastCtrl.create({
                message: 'Failed to login. Invalid username or password',
                duration: 3000,
                position: 'bottom',
                dismissOnPageChange: true
              });
              toastMessage.present();
            });
          }, 2000);
        }

        if (wifiAvailability == 0) {
          loadingMessage.dismiss();
          let alertMessage = this.alertCtrl.create({
            title: "Please try either of the following or all of it:<br>",
            subTitle: "1) Turn on your device's wifi<br>" +
              "2) Connect to NYP's wifi<br>",
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
    } else {
      setTimeout(() => {
        this.authenticationService.login(this.loginData).subscribe(result => {
          loadingMessage.dismiss();
          this.data = result;
          localStorage.setItem('token', this.data.access_token);
          this.navCtrl.setRoot(ScanPage,
            {
              'username': this.loginData.username
            });
        }, error => {
          loadingMessage.dismiss();
          let toastMessage = this.toastCtrl.create({
            message: 'Failed to login. Invalid username or password or your device is not connected to NYP wifi',
            duration: 3000,
            position: 'bottom',
            dismissOnPageChange: true
          });
          toastMessage.present();
        });
      }, 2000);
    }
    
    
    
  }
}
