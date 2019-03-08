import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, AlertController, App } from 'ionic-angular';
import { GeneralControlPage } from '../general-control/general-control';
import { ProjectorApiProvider } from '../../providers/projector-api/projector-api';
import QRReader from '../../../Custom-modules/barcode-scanner-master/app/js/vendor/qrscan.js';

/**
 * Generated class for the PwaScannerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
declare var document: any;
declare var window: any;

@IonicPage()
@Component({
  selector: 'page-pwa-scanner',
  templateUrl: 'pwa-scanner.html',
})
export class PwaScannerPage {
  username: string = this.navParams.get("username");
  data: any;
  UsageData: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private platform: Platform, private ProjectorApiService: ProjectorApiProvider, private alertCtrl: AlertController, private app: App) {
    console.log(this.username + "in pwa-scanner page");
  }

  ionViewDidLoad() {
    window.iOS = ['iPad', 'iPhone', 'iPod'].indexOf(navigator.platform) >= 0;
    var copiedText = null;
    var frame = null;
    var selectPhotoBtn = document.querySelector('.app__select-photos');
    var dialogElement = document.querySelector('.app__dialog');
    var dialogOverlayElement = document.querySelector('.app__dialog-overlay');
    var dialogOpenBtnElement = document.querySelector('.app__dialog-open');
    var dialogCloseBtnElement = document.querySelector('.app__dialog-close');
    var scanningEle = document.querySelector('.custom-scanner');
    var textBoxEle = document.querySelector('#result');
    var helpText = document.querySelector('.app__help-text');
    var videoElement = document.querySelector('video');
    window.appOverlay = document.querySelector('.app__overlay');


    QRReader.init();
    setTimeout(() => {
      this.setCameraOverlay();
      if (!this.platform.is('ios')) {
        this.scan();
      }
    }, 1000);

    if (this.platform.is('ios')) {
      this.selectFromPhoto();
    }
  }

  setCameraOverlay() {
    var helpText = document.querySelector('.app__help-text');
    window.appOverlay.style.borderStyle = 'solid';
    helpText.style.display = 'block';
  }

  scan() {
    var copiedText = null;
    var textBoxEle = document.querySelector('#result');
    var scanningEle = document.querySelector('.custom-scanner');
    var dialogElement = document.querySelector('.app__dialog');
    var dialogOverlayElement = document.querySelector('.app__dialog-overlay');
    if (!this.platform.is('ios')) {
      scanningEle.style.display = 'block'
    }
    QRReader.scan((result) => {
      this.ProjectorApiService.getProjectors(result).subscribe(data => {
        if (data != null) {
          this.ProjectorApiService.InsertRoomNum(data.RoomNum, this.username).subscribe(result => console.log("Result:" + result), error => console.log("Error" + error));
          this.ProjectorApiService.getUsage(data.RoomNum).subscribe(UsageData => {
            console.log(UsageData.CurrentlyUsed);
            console.log(UsageData.CurrentUser);
            if (UsageData.CurrentlyUsed == false) {
              this.ProjectorApiService.updateUsage(data.RoomNum, this.username).subscribe(result => console.log("Result:" + result), error => console.log("Error" + error));
              QRReader.stopCamera();
              this.app.getRootNav().push(GeneralControlPage, {
                'username': this.username,
                'roomID': data.RoomNum,
                'signalID': data.SymbolID
              });
            } else if (UsageData.CurrentUser == this.username) {
              QRReader.stopCamera();
              this.app.getRootNav().push(GeneralControlPage, {
                'username': this.username,
                'roomID': data.RoomNum,
                'signalID': data.SymbolID
              });
            } else {
              let alertMessage = this.alertCtrl.create({
                title: UsageData.CurrentUser + ' is currently using room ' + data.RoomNum + ' projector, Are you sure you want to access it?',
                enableBackdropDismiss: false,
                buttons: [{
                  text: 'NO',
                  handler: () => {
                    QRReader.stopCamera();
                    this.navCtrl.pop();
                  }
                },
                {
                  text: 'YES',
                  handler: () => {
                    this.ProjectorApiService.updateUsage(data.RoomNum, this.username).subscribe(result => console.log("Result:" + result), error => console.log("Error" + error));
                    QRReader.stopCamera();
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
          let alertMessage = this.alertCtrl.create({
            title: 'Invalid QRcode',
            enableBackdropDismiss: false,
            buttons: [{
              text: 'OK',
              handler: () => {
                QRReader.stopCamera();
                this.navCtrl.pop();
              }
            }]
          });
          alertMessage.present();
        }
      })
    });
  }

  selectFromPhoto() {
    var frame = null;
    var videoElement = document.querySelector('video');
    var helpText = document.querySelector('.app__help-text');
    var scanningEle = document.querySelector('.custom-scanner');
    if (videoElement) {
      videoElement.remove(); //removing the video element
    }

    //Creating the camera element
    var camera = document.createElement('input');
    camera.setAttribute('type', 'file');
    camera.setAttribute('capture', 'camera');
    camera.id = 'camera';
    helpText.textContent = 'Select photos from here';
    helpText.style.display = 'block';
    helpText.style.bottom = '-60px';
    window.appOverlay.style.borderStyle = '';
    frame = document.createElement('img');
    frame.src = '';
    frame.id = 'frame';

    ////Add the camera and img element to DOM
    var pageContentElement = document.querySelector('.app__layout-content');
    pageContentElement.appendChild(frame);

    ////Click of camera fab icon
    helpText.addEventListener('click', () => {
      scanningEle.style.display = 'none';
      camera.click();
    });

    //On camera change
    camera.addEventListener('change', (event) => {
      if (event.target && event.target.files.length > 0) {
        frame.className = 'app__overlay';
        frame.src = URL.createObjectURL(event.target.files[0]);
        scanningEle.style.display = 'block';
        window.appOverlay.style.borderColor = '#212121';
        this.scan();
      }
    });
  }

  ionViewDidLeave() {
    //QRReader.stopCamera();
    console.log("ionViewDidLeave");
  }
}
