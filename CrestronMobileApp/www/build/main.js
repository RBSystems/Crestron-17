webpackJsonp([2],{

/***/ 117:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PwaScannerPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__general_control_general_control__ = __webpack_require__(88);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_projector_api_projector_api__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__node_modules_Custom_modules_barcode_scanner_master_app_js_vendor_qrscan_js__ = __webpack_require__(309);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__node_modules_Custom_modules_barcode_scanner_master_app_js_vendor_qrscan_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__node_modules_Custom_modules_barcode_scanner_master_app_js_vendor_qrscan_js__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var PwaScannerPage = /** @class */ (function () {
    function PwaScannerPage(navCtrl, navParams, platform, ProjectorApiService, alertCtrl, app) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.platform = platform;
        this.ProjectorApiService = ProjectorApiService;
        this.alertCtrl = alertCtrl;
        this.app = app;
        this.username = this.navParams.get("username");
        console.log(this.username + "in pwa-scanner page");
    }
    PwaScannerPage.prototype.ionViewDidLoad = function () {
        var _this = this;
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
        __WEBPACK_IMPORTED_MODULE_4__node_modules_Custom_modules_barcode_scanner_master_app_js_vendor_qrscan_js___default.a.init();
        setTimeout(function () {
            _this.setCameraOverlay();
            if (!_this.platform.is('ios')) {
                _this.scan();
            }
        }, 1000);
        if (this.platform.is('ios')) {
            this.selectFromPhoto();
        }
    };
    PwaScannerPage.prototype.setCameraOverlay = function () {
        var helpText = document.querySelector('.app__help-text');
        window.appOverlay.style.borderStyle = 'solid';
        helpText.style.display = 'block';
    };
    PwaScannerPage.prototype.scan = function () {
        var _this = this;
        var copiedText = null;
        var textBoxEle = document.querySelector('#result');
        var scanningEle = document.querySelector('.custom-scanner');
        var dialogElement = document.querySelector('.app__dialog');
        var dialogOverlayElement = document.querySelector('.app__dialog-overlay');
        if (!this.platform.is('ios')) {
            scanningEle.style.display = 'block';
        }
        __WEBPACK_IMPORTED_MODULE_4__node_modules_Custom_modules_barcode_scanner_master_app_js_vendor_qrscan_js___default.a.scan(function (result) {
            _this.ProjectorApiService.getProjectors(result).subscribe(function (data) {
                if (data != null) {
                    _this.ProjectorApiService.InsertRoomNum(data.RoomNum, _this.username).subscribe(function (result) { return console.log("Result:" + result); }, function (error) { return console.log("Error" + error); });
                    _this.ProjectorApiService.getUsage(data.RoomNum).subscribe(function (UsageData) {
                        console.log(UsageData.CurrentlyUsed);
                        console.log(UsageData.CurrentUser);
                        if (UsageData.CurrentlyUsed == false) {
                            _this.ProjectorApiService.updateUsage(data.RoomNum, _this.username).subscribe(function (result) { return console.log("Result:" + result); }, function (error) { return console.log("Error" + error); });
                            __WEBPACK_IMPORTED_MODULE_4__node_modules_Custom_modules_barcode_scanner_master_app_js_vendor_qrscan_js___default.a.stopCamera();
                            _this.app.getRootNav().push(__WEBPACK_IMPORTED_MODULE_2__general_control_general_control__["a" /* GeneralControlPage */], {
                                'username': _this.username,
                                'roomID': data.RoomNum,
                                'signalID': data.SymbolID
                            });
                        }
                        else if (UsageData.CurrentUser == _this.username) {
                            __WEBPACK_IMPORTED_MODULE_4__node_modules_Custom_modules_barcode_scanner_master_app_js_vendor_qrscan_js___default.a.stopCamera();
                            _this.app.getRootNav().push(__WEBPACK_IMPORTED_MODULE_2__general_control_general_control__["a" /* GeneralControlPage */], {
                                'username': _this.username,
                                'roomID': data.RoomNum,
                                'signalID': data.SymbolID
                            });
                        }
                        else {
                            var alertMessage = _this.alertCtrl.create({
                                title: UsageData.CurrentUser + ' is currently using room ' + data.RoomNum + ' projector, Are you sure you want to access it?',
                                enableBackdropDismiss: false,
                                buttons: [{
                                        text: 'NO',
                                        handler: function () {
                                            __WEBPACK_IMPORTED_MODULE_4__node_modules_Custom_modules_barcode_scanner_master_app_js_vendor_qrscan_js___default.a.stopCamera();
                                            _this.navCtrl.pop();
                                        }
                                    },
                                    {
                                        text: 'YES',
                                        handler: function () {
                                            _this.ProjectorApiService.updateUsage(data.RoomNum, _this.username).subscribe(function (result) { return console.log("Result:" + result); }, function (error) { return console.log("Error" + error); });
                                            __WEBPACK_IMPORTED_MODULE_4__node_modules_Custom_modules_barcode_scanner_master_app_js_vendor_qrscan_js___default.a.stopCamera();
                                            _this.app.getRootNav().push(__WEBPACK_IMPORTED_MODULE_2__general_control_general_control__["a" /* GeneralControlPage */], {
                                                'username': _this.username,
                                                'roomID': data.RoomNum,
                                                'signalID': data.SymbolID
                                            });
                                        }
                                    }]
                            });
                            alertMessage.present();
                        }
                    });
                }
                else {
                    var alertMessage = _this.alertCtrl.create({
                        title: 'Invalid QRcode',
                        enableBackdropDismiss: false,
                        buttons: [{
                                text: 'OK',
                                handler: function () {
                                    __WEBPACK_IMPORTED_MODULE_4__node_modules_Custom_modules_barcode_scanner_master_app_js_vendor_qrscan_js___default.a.stopCamera();
                                    _this.navCtrl.pop();
                                }
                            }]
                    });
                    alertMessage.present();
                }
            });
        });
    };
    PwaScannerPage.prototype.selectFromPhoto = function () {
        var _this = this;
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
        helpText.addEventListener('click', function () {
            scanningEle.style.display = 'none';
            camera.click();
        });
        //On camera change
        camera.addEventListener('change', function (event) {
            if (event.target && event.target.files.length > 0) {
                frame.className = 'app__overlay';
                frame.src = URL.createObjectURL(event.target.files[0]);
                scanningEle.style.display = 'block';
                window.appOverlay.style.borderColor = '#212121';
                _this.scan();
            }
        });
    };
    PwaScannerPage.prototype.ionViewDidLeave = function () {
        //QRReader.stopCamera();
        console.log("ionViewDidLeave");
    };
    PwaScannerPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-pwa-scanner',template:/*ion-inline-start:"C:\Project\CrestronMobileApp\src\pages\pwa-scanner\pwa-scanner.html"*/'<!DOCTYPE html>\n\n<html lang="en">\n\n<head>\n\n  <meta charset="utf-8">\n\n  <title>QR Code Scanner</title>\n\n  <meta http-equiv=X-UA-Compatible content="IE=edge">\n\n  <meta name=description content="QR Code Scanner is the fastest and most user-friendly web application.">\n\n  <meta name="viewport" content="width=device-width,initial-scale=1.0">\n\n  <meta name="mobile-web-app-capable" content="yes">\n\n  <meta name="apple-mobile-web-app-title" content="QR Scanner" />\n\n  <meta name="apple-mobile-web-app-status-bar-style" content="#e4e4e4">\n\n  <meta name="apple-mobile-web-app-capable" content="yes">\n\n  <meta name="application-name" content="QR Scanner" />\n\n  <meta name="msapplication-TileColor" content="#e4e4e4" />\n\n  <meta name="msapplication-TileImage" content="/images/touch/mstile-150x150.png" />\n\n  <meta name="theme-color" content="#fff" />\n\n  <link rel="apple-touch-icon" href="/images/touch/apple-touch-icon.jpg" />\n\n  <link rel="icon" type="image/png" href="/images/touch/favicon-32x32.png" sizes="32x32" />\n\n  <link rel="icon" type="image/png" href="/images/touch/favicon-16x16.png" sizes="16x16" />\n\n  <link rel="shortcut icon" href="/images/touch/favicon.ico">\n\n  <link rel="manifest" href="/manifest.json">\n\n</head>\n\n<body>\n\n  <div class="app__layout">\n\n\n\n    <main class="app__layout-content">\n\n      <video autoplay></video>\n\n\n\n      <!-- Dialog  -->\n\n      <div class="app__dialog app__dialog--hide">\n\n        <div class="app__dialog-content">\n\n          <h5>QR Code</h5>\n\n          <input type="text" id="result">\n\n        </div>\n\n        <div class="app__dialog-actions">\n\n          <button type="button" class="app__dialog-open">Open</button>\n\n          <button type="button" class="app__dialog-close">Close</button>\n\n        </div>\n\n      </div>\n\n      <div class="app__dialog-overlay app__dialog--hide"></div>\n\n      <!-- Snackbar -->\n\n      <div class="app__snackbar"></div>\n\n    </main>\n\n  </div>\n\n  <div class="app__overlay">\n\n    <div class="app__overlay-frame"></div>\n\n    <!-- Scanner animation -->\n\n    <div class="custom-scanner"></div>\n\n    <div class="app__help-text">Point your camera at a QR Code</div>\n\n    <div class="app__select-photos">Select from photos</div>\n\n  </div>\n\n\n\n  <script>\n\n    if (location.hostname !== "localhost") {\n\n      (function (i, s, o, g, r, a, m) {\n\n        i[\'GoogleAnalyticsObject\'] = r; i[r] = i[r] || function () {\n\n          (i[r].q = i[r].q || []).push(arguments)\n\n        }, i[r].l = 1 * new Date(); a = s.createElement(o),\n\n          m = s.getElementsByTagName(o)[0]; a.async = 1; a.src = g; m.parentNode.insertBefore(a, m)\n\n      })(window, document, \'script\', \'//www.google-analytics.com/analytics.js\', \'ga\');\n\n      ga(\'create\', \'pageview\');\n\n    }\n\n  </script>\n\n</body>\n\n</html>\n\n\n\n'/*ion-inline-end:"C:\Project\CrestronMobileApp\src\pages\pwa-scanner\pwa-scanner.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* Platform */], __WEBPACK_IMPORTED_MODULE_3__providers_projector_api_projector_api__["a" /* ProjectorApiProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* App */]])
    ], PwaScannerPage);
    return PwaScannerPage;
}());

//# sourceMappingURL=pwa-scanner.js.map

/***/ }),

/***/ 129:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 129;

/***/ }),

/***/ 170:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/login/login.module": [
		334,
		1
	],
	"../pages/pwa-scanner/pwa-scanner.module": [
		335,
		0
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids)
		return Promise.reject(new Error("Cannot find module '" + req + "'."));
	return __webpack_require__.e(ids[1]).then(function() {
		return __webpack_require__(ids[0]);
	});
};
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = 170;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 173:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ScanPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_barcode_scanner__ = __webpack_require__(174);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__pwa_scanner_pwa_scanner__ = __webpack_require__(117);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__general_control_general_control__ = __webpack_require__(88);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_projector_api_projector_api__ = __webpack_require__(51);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var ScanPage = /** @class */ (function () {
    function ScanPage(app, platform, navCtrl, navParams, alertCtrl, toastCtrl, barcodeScanner, ProjectorApiService) {
        var _this = this;
        this.app = app;
        this.platform = platform;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.alertCtrl = alertCtrl;
        this.toastCtrl = toastCtrl;
        this.barcodeScanner = barcodeScanner;
        this.ProjectorApiService = ProjectorApiService;
        this.username = this.navParams.get("username");
        this.platform.registerBackButtonAction(function () {
            var alertMessage = _this.alertCtrl.create({
                title: 'Do you want to exit the app?',
                buttons: [{
                        text: 'NO',
                        handler: function () {
                        }
                    },
                    {
                        text: 'YES',
                        handler: function () {
                            platform.exitApp();
                        }
                    }]
            });
            alertMessage.present();
        }, 100);
    }
    ScanPage.prototype.scanCode = function () {
        var _this = this;
        if (this.platform.is('cordova')) {
            this.barcodeScanner.scan().then(function (barcodeData) {
                _this.ProjectorApiService.getProjectors(barcodeData.text).subscribe(function (data) {
                    if (data != null) {
                        _this.ProjectorApiService.InsertRoomNum(data.RoomNum, _this.username).subscribe(function (result) { return console.log("Result:" + result); }, function (error) { return console.log("Error" + error); });
                        _this.ProjectorApiService.getUsage(data.RoomNum).subscribe(function (UsageData) {
                            console.log(UsageData.CurrentlyUsed);
                            console.log(UsageData.CurrentUser);
                            if (UsageData.CurrentlyUsed == false) {
                                _this.ProjectorApiService.updateUsage(data.RoomNum, _this.username).subscribe(function (result) { return console.log("Result:" + result); }, function (error) { return console.log("Error" + error); });
                                _this.app.getRootNav().push(__WEBPACK_IMPORTED_MODULE_4__general_control_general_control__["a" /* GeneralControlPage */], {
                                    'username': _this.username,
                                    'roomID': data.RoomNum,
                                    'signalID': data.SymbolID
                                });
                            }
                            else if (UsageData.CurrentUser == _this.username) {
                                _this.app.getRootNav().push(__WEBPACK_IMPORTED_MODULE_4__general_control_general_control__["a" /* GeneralControlPage */], {
                                    'username': _this.username,
                                    'roomID': data.RoomNum,
                                    'signalID': data.SymbolID
                                });
                            }
                            else {
                                var alertMessage = _this.alertCtrl.create({
                                    title: UsageData.CurrentUser + ' is currently using room ' + data.RoomNum + ' projector, Are you sure you want to access it?',
                                    buttons: [{
                                            text: 'NO',
                                            handler: function () {
                                            }
                                        },
                                        {
                                            text: 'YES',
                                            handler: function () {
                                                _this.ProjectorApiService.updateUsage(data.RoomNum, _this.username).subscribe(function (result) { return console.log("Result:" + result); }, function (error) { return console.log("Error" + error); });
                                                _this.app.getRootNav().push(__WEBPACK_IMPORTED_MODULE_4__general_control_general_control__["a" /* GeneralControlPage */], {
                                                    'username': _this.username,
                                                    'roomID': data.RoomNum,
                                                    'signalID': data.SymbolID
                                                });
                                            }
                                        }]
                                });
                                alertMessage.present();
                            }
                        });
                    }
                    else {
                        var toastMessage = _this.toastCtrl.create({
                            message: 'Invalid QRcode',
                            duration: 3000,
                            position: 'bottom',
                            dismissOnPageChange: true
                        });
                        toastMessage.present();
                    }
                });
            });
        }
        else {
            this.app.getRootNav().push(__WEBPACK_IMPORTED_MODULE_3__pwa_scanner_pwa_scanner__["a" /* PwaScannerPage */], {
                'username': this.username
            });
        }
    };
    ScanPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-scan',template:/*ion-inline-start:"C:\Project\CrestronMobileApp\src\pages\scan\scan.html"*/'<ion-content class=bg>\n\n  <img style="display: block;\n\n      margin-left: auto;\n\n      margin-right: auto;\n\n      position: relative;\n\n      top:100px;" src="assets/imgs/scanwhite.png" />\n\n  <div text-center>\n\n    <p class="a">Scan QR Code to proceed</p>\n\n  </div>\n\n  <button class="b" style="display: block;\n\n  margin-left: auto;\n\n  margin-right: auto;\n\n  position: relative;\n\n  top:150px;" ion-button color=light round outline (click)="scanCode()">\n\n    SCAN\n\n  </button>\n\n</ion-content>\n\n'/*ion-inline-end:"C:\Project\CrestronMobileApp\src\pages\scan\scan.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* App */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* Platform */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* ToastController */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_barcode_scanner__["a" /* BarcodeScanner */], __WEBPACK_IMPORTED_MODULE_5__providers_projector_api_projector_api__["a" /* ProjectorApiProvider */]])
    ], ScanPage);
    return ScanPage;
}());

//# sourceMappingURL=scan.js.map

/***/ }),

/***/ 189:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RemoteControlProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(299);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var RemoteControlProvider = /** @class */ (function () {
    function RemoteControlProvider(http) {
        this.http = http;
    }
    RemoteControlProvider.prototype.sendRemoteCommand = function (signalID, attributeID, value) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]({ 'Content-Type': 'multipart/form-data' });
        var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestOptions */]({ headers: headers, withCredentials: true });
        console.log('Sending remote command : https://fusion.sit.nyp.edu.sg/Fusion/apiservice/signalvalues/' + signalID + '/' + attributeID + '?value=' + value + '&auth=Crestron1%200BF34A53-3DD3-438D-B88F-BEC77EAB3009');
        return this.http.put('https://fusion.sit.nyp.edu.sg/Fusion/apiservice/signalvalues/' + signalID + '/' + attributeID + '?value=' + value + '&auth=Crestron1%200BF34A53-3DD3-438D-B88F-BEC77EAB3009', JSON.stringify(this.data), options).map(function (res) { return res.json(); });
    };
    RemoteControlProvider.prototype.sendEventLog = function (RoomNum, Username, Projector_Event, Latitude, Longitude, SSID) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]({ 'Content-Type': 'multipart/form-data' });
        var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestOptions */]({ headers: headers });
        console.log('Sending Event Log : https://crestron.sit.nyp.edu.sg/TestAPI/api/Values?RoomNum=' + RoomNum + '&AccountID=' + Username + '&Projector_Function=' + Projector_Event + '&Latitude=' + Latitude + '&Longitude=' + Longitude + '&SSID=' + SSID);
        return this.http.post('https://crestron.sit.nyp.edu.sg/TestAPI/api/Values?RoomNum=' + RoomNum + '&AccountID=' + Username + '&Projector_Function=' + Projector_Event + '&Latitude=' + Latitude + '&Longitude=' + Longitude + '&SSID=' + SSID, JSON.stringify(this.data), options).map(function (res) { return res.json(); });
    };
    RemoteControlProvider.prototype.updateUsageLeave = function (RoomNum, username) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]({ 'Content-Type': 'multipart/form-data' });
        var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestOptions */]({ headers: headers });
        console.log('Sending Event Log : https://crestron.sit.nyp.edu.sg/TestAPI/api/UsageCheckAPI?RoomNum=' + RoomNum + '&CurrentUser=' + username + '&CurrentlyUsed=0');
        return this.http.post('https://crestron.sit.nyp.edu.sg/TestAPI/api/UsageCheckAPI?RoomNum=' + RoomNum + '&CurrentUser=' + username + '&CurrentlyUsed=0', JSON.stringify(this.data), options).map(function (res) { return res.json(); });
    };
    RemoteControlProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */]])
    ], RemoteControlProvider);
    return RemoteControlProvider;
}());

//# sourceMappingURL=remote-control.js.map

/***/ }),

/***/ 232:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(233);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(253);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 253:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(229);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__ = __webpack_require__(230);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_barcode_scanner__ = __webpack_require__(174);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_common_http__ = __webpack_require__(95);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__angular_http__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_native_geolocation__ = __webpack_require__(175);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ionic_native_hotspot__ = __webpack_require__(176);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__ionic_native_network_interface__ = __webpack_require__(177);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__ionic_native_local_notifications__ = __webpack_require__(188);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__ionic_native_diagnostic__ = __webpack_require__(85);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__ionic_native_open_native_settings__ = __webpack_require__(87);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__ionic_native_background_mode__ = __webpack_require__(187);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__app_component__ = __webpack_require__(327);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__pages_login_login__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__pages_scan_scan__ = __webpack_require__(173);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__pages_general_control_general_control__ = __webpack_require__(88);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__pages_pwa_scanner_pwa_scanner__ = __webpack_require__(117);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__providers_remote_control_remote_control__ = __webpack_require__(189);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__providers_authentication_authentication__ = __webpack_require__(94);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__providers_projector_api_projector_api__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__ng_idle_keepalive__ = __webpack_require__(332);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
























var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_15__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_16__pages_login_login__["a" /* LoginPage */],
                __WEBPACK_IMPORTED_MODULE_17__pages_scan_scan__["a" /* ScanPage */],
                __WEBPACK_IMPORTED_MODULE_18__pages_general_control_general_control__["a" /* GeneralControlPage */],
                __WEBPACK_IMPORTED_MODULE_19__pages_pwa_scanner_pwa_scanner__["a" /* PwaScannerPage */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_6__angular_common_http__["b" /* HttpClientModule */],
                __WEBPACK_IMPORTED_MODULE_7__angular_http__["c" /* HttpModule */],
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["e" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_15__app_component__["a" /* MyApp */], {}, {
                    links: [
                        { loadChildren: '../pages/login/login.module#LoginPageModule', name: 'LoginPage', segment: 'login', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/pwa-scanner/pwa-scanner.module#PwaScannerPageModule', name: 'PwaScannerPage', segment: 'pwa-scanner', priority: 'low', defaultHistory: [] }
                    ]
                }),
                __WEBPACK_IMPORTED_MODULE_23__ng_idle_keepalive__["a" /* NgIdleKeepaliveModule */].forRoot()
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_15__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_16__pages_login_login__["a" /* LoginPage */],
                __WEBPACK_IMPORTED_MODULE_17__pages_scan_scan__["a" /* ScanPage */],
                __WEBPACK_IMPORTED_MODULE_18__pages_general_control_general_control__["a" /* GeneralControlPage */],
                __WEBPACK_IMPORTED_MODULE_19__pages_pwa_scanner_pwa_scanner__["a" /* PwaScannerPage */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */],
                __WEBPACK_IMPORTED_MODULE_5__ionic_native_barcode_scanner__["a" /* BarcodeScanner */],
                { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["u" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["d" /* IonicErrorHandler */] },
                __WEBPACK_IMPORTED_MODULE_20__providers_remote_control_remote_control__["a" /* RemoteControlProvider */],
                __WEBPACK_IMPORTED_MODULE_21__providers_authentication_authentication__["a" /* AuthenticationProvider */],
                __WEBPACK_IMPORTED_MODULE_22__providers_projector_api_projector_api__["a" /* ProjectorApiProvider */],
                __WEBPACK_IMPORTED_MODULE_8__ionic_native_geolocation__["a" /* Geolocation */],
                __WEBPACK_IMPORTED_MODULE_9__ionic_native_hotspot__["a" /* Hotspot */],
                __WEBPACK_IMPORTED_MODULE_10__ionic_native_network_interface__["a" /* NetworkInterface */],
                __WEBPACK_IMPORTED_MODULE_11__ionic_native_local_notifications__["a" /* LocalNotifications */],
                __WEBPACK_IMPORTED_MODULE_12__ionic_native_diagnostic__["a" /* Diagnostic */],
                __WEBPACK_IMPORTED_MODULE_13__ionic_native_open_native_settings__["a" /* OpenNativeSettings */],
                __WEBPACK_IMPORTED_MODULE_14__ionic_native_background_mode__["a" /* BackgroundMode */]
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 327:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(230);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_observable_timer__ = __webpack_require__(328);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_observable_timer___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_observable_timer__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_login_login__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_splash_screen__ = __webpack_require__(229);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var MyApp = /** @class */ (function () {
    function MyApp(platform, statusBar, modalCtrl, splashScreen) {
        var _this = this;
        this.showSplash = true;
        this.rootPage = __WEBPACK_IMPORTED_MODULE_4__pages_login_login__["a" /* LoginPage */];
        if (!platform.is('cordova')) {
            this.showSplash = false;
        }
        platform.ready().then(function () {
            statusBar.styleDefault();
            splashScreen.hide();
            Object(__WEBPACK_IMPORTED_MODULE_3_rxjs_observable_timer__["timer"])(4000).subscribe(function () { return _this.showSplash = false; });
        });
    }
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"C:\Project\CrestronMobileApp\src\app\app.html"*/'<ion-nav [root]="rootPage"></ion-nav>\n\n\n\n<div *ngIf="showSplash" class="splash">\n\n  <img style="display:block;\n\n        top:5%;\n\n        margin-left:auto;\n\n        margin-right:auto;\n\n        position:relative;" width="100" height="100" src="assets/imgs/nyplogo.png">\n\n  <h1 text-center><b>iProjection</b></h1>\n\n  <h5 text-center>Smart Control</h5>\n\n  <div class="spinner"></div>\n\n\n\n  <div class="spinner">\n\n    <div class="rect1"></div>\n\n    <div class="rect2"></div>\n\n    <div class="rect3"></div>\n\n    <div class="rect4"></div>\n\n    <div class="rect5"></div>\n\n  </div>\n\n\n\n</div>\n\n\n\n'/*ion-inline-end:"C:\Project\CrestronMobileApp\src\app\app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* ModalController */], __WEBPACK_IMPORTED_MODULE_5__ionic_native_splash_screen__["a" /* SplashScreen */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 51:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProjectorApiProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common_http__ = __webpack_require__(95);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_do__ = __webpack_require__(303);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_do___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_do__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_catch__ = __webpack_require__(306);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_catch___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_catch__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_Observable__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_Observable__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






/*
  Generated class for the ProjectorApiProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var ProjectorApiProvider = /** @class */ (function () {
    function ProjectorApiProvider(http, http2) {
        this.http = http;
        this.http2 = http2;
        console.log('Hello ProjectorApiProvider Provider');
    }
    ProjectorApiProvider.prototype.getProjectors = function (EncryptedRoomNum) {
        return this.http.get("https://crestron.sit.nyp.edu.sg/TestAPI/api/Values?EncryptedRoomNum=" + EncryptedRoomNum)
            .do(this.logResponse)
            .catch(this.catchError);
    };
    ProjectorApiProvider.prototype.getUsage = function (RoomNum) {
        return this.http.get("https://crestron.sit.nyp.edu.sg/TestAPI/api/UsageCheckAPI?RoomNum1=" + RoomNum)
            .do(this.logResponse)
            .catch(this.catchError);
    };
    ProjectorApiProvider.prototype.updateUsage = function (RoomNum, username) {
        var headers = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Headers */]({ 'Content-Type': 'multipart/form-data' });
        var options = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["d" /* RequestOptions */]({ headers: headers });
        console.log('Sending Event Log : https://crestron.sit.nyp.edu.sg/TestAPI/api/UsageCheckAPI?RoomNum=' + RoomNum + '&CurrentUser=' + username + '&CurrentlyUsed=1');
        return this.http2.post('https://crestron.sit.nyp.edu.sg/TestAPI/api/UsageCheckAPI?RoomNum=' + RoomNum + '&CurrentUser=' + username + '&CurrentlyUsed=1', JSON.stringify(this.data), options).map(function (res) { return res.json(); });
    };
    ProjectorApiProvider.prototype.InsertRoomNum = function (RoomNum, username) {
        var headers = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Headers */]({ 'Content-Type': 'multipart/form-data' });
        var options = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["d" /* RequestOptions */]({ headers: headers });
        console.log('Sending Event Log : https://crestron.sit.nyp.edu.sg/TestAPI/api/UsageCheckAPI?RoomNum2' + RoomNum + '&CurrentUser2=' + username + '&CurrentlyUsed2=0');
        return this.http2.post('https://crestron.sit.nyp.edu.sg/TestAPI/api/UsageCheckAPI?RoomNum2=' + RoomNum + '&CurrentUser2=' + username + '&CurrentlyUsed2=0', JSON.stringify(this.data), options).map(function (res) { return res.json(); });
    };
    ProjectorApiProvider.prototype.catchError = function (error) {
        console.log(error);
        return __WEBPACK_IMPORTED_MODULE_5_rxjs_Observable__["Observable"].throw(error.json().error || "Server error.");
    };
    ProjectorApiProvider.prototype.logResponse = function (res) {
        console.log(res);
    };
    ProjectorApiProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_common_http__["a" /* HttpClient */], __WEBPACK_IMPORTED_MODULE_2__angular_http__["b" /* Http */]])
    ], ProjectorApiProvider);
    return ProjectorApiProvider;
}());

//# sourceMappingURL=projector-api.js.map

/***/ }),

/***/ 56:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_diagnostic__ = __webpack_require__(85);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_open_native_settings__ = __webpack_require__(87);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__scan_scan__ = __webpack_require__(173);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_authentication_authentication__ = __webpack_require__(94);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var LoginPage = /** @class */ (function () {
    function LoginPage(platform, navCtrl, navParams, alertCtrl, loadingCtrl, toastCtrl, authenticationService, diagnostic, openNativeSettings) {
        var _this = this;
        this.platform = platform;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.alertCtrl = alertCtrl;
        this.loadingCtrl = loadingCtrl;
        this.toastCtrl = toastCtrl;
        this.authenticationService = authenticationService;
        this.diagnostic = diagnostic;
        this.openNativeSettings = openNativeSettings;
        this.loginData = { username: '', password: '' };
        this.platform.registerBackButtonAction(function () {
            var alertMessage = _this.alertCtrl.create({
                title: 'Do you want to exit the app?',
                buttons: [{
                        text: 'NO',
                        handler: function () {
                        }
                    },
                    {
                        text: 'YES',
                        handler: function () {
                            platform.exitApp();
                        }
                    }]
            });
            alertMessage.present();
        }, 100);
    }
    LoginPage.prototype.doLogin = function () {
        var _this = this;
        var loadingMessage = this.loadingCtrl.create({
            content: 'Authenticating...'
        });
        loadingMessage.present();
        if (this.platform.is('cordova')) {
            console.log(this.platform.is('cordova') + " is cordova");
            this.diagnostic.isWifiAvailable().then(function (wifiAvailability) {
                if (wifiAvailability == 1) {
                    setTimeout(function () {
                        _this.authenticationService.login(_this.loginData).subscribe(function (result) {
                            loadingMessage.dismiss();
                            _this.data = result;
                            localStorage.setItem('token', _this.data.access_token);
                            _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_4__scan_scan__["a" /* ScanPage */], {
                                'username': _this.loginData.username
                            });
                        }, function (error) {
                            loadingMessage.dismiss();
                            var toastMessage = _this.toastCtrl.create({
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
                    var alertMessage = _this.alertCtrl.create({
                        title: "Please try either of the following or all of it:<br>",
                        subTitle: "1) Turn on your device's wifi<br>" +
                            "2) Connect to NYP's wifi<br>",
                        buttons: [{
                                text: 'No thanks',
                                handler: function () {
                                }
                            }, {
                                text: 'Open Wifi settings',
                                handler: function () {
                                    _this.openNativeSettings.open("wifi");
                                }
                            }]
                    });
                    alertMessage.present();
                }
            });
        }
        else {
            setTimeout(function () {
                _this.authenticationService.login(_this.loginData).subscribe(function (result) {
                    loadingMessage.dismiss();
                    _this.data = result;
                    localStorage.setItem('token', _this.data.access_token);
                    _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_4__scan_scan__["a" /* ScanPage */], {
                        'username': _this.loginData.username
                    });
                }, function (error) {
                    loadingMessage.dismiss();
                    var toastMessage = _this.toastCtrl.create({
                        message: 'Failed to login. Invalid username or password or your device is not connected to NYP wifi',
                        duration: 3000,
                        position: 'bottom',
                        dismissOnPageChange: true
                    });
                    toastMessage.present();
                });
            }, 2000);
        }
    };
    LoginPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-login',template:/*ion-inline-start:"C:\Project\CrestronMobileApp\src\pages\login\login.html"*/'<ion-content text-center class="bg">\n\n  <img style="display:block;\n\n      top:5%;\n\n      margin-left:auto;\n\n      margin-right:auto;\n\n      position:relative;" width="100" height="100" src="assets/imgs/nyplogo.png">\n\n  <div class="head" text-center>\n\n    <h1>\n\n      <b>iProjection</b>\n\n    </h1>\n\n    <h5>Smart Control</h5>\n\n  </div>\n\n  <div text-center class="inputs">\n\n    <form (submit)="doLogin()">\n\n      <ion-item>\n\n        <ion-label stacked>Username</ion-label>\n\n        <ion-input [(ngModel)]="loginData.username" (ngModelChange)="loginData.username = $event.toLocaleUpperCase()" name="username" type="text"></ion-input>\n\n      </ion-item>\n\n      <ion-item class="pass">\n\n        <ion-label stacked>Password</ion-label>\n\n        <ion-input [(ngModel)]="loginData.password" name="password" type="password"></ion-input>\n\n      </ion-item>\n\n      <button ion-button block round type="submit">\n\n        Login\n\n      </button>\n\n    </form>\n\n    <p>*SIT Domain Account ID & Password</p>\n\n  </div>\n\n</ion-content>\n\n'/*ion-inline-end:"C:\Project\CrestronMobileApp\src\pages\login\login.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* Platform */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* ToastController */], __WEBPACK_IMPORTED_MODULE_5__providers_authentication_authentication__["a" /* AuthenticationProvider */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_diagnostic__["a" /* Diagnostic */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_open_native_settings__["a" /* OpenNativeSettings */]])
    ], LoginPage);
    return LoginPage;
}());

//# sourceMappingURL=login.js.map

/***/ }),

/***/ 88:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GeneralControlPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_geolocation__ = __webpack_require__(175);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_hotspot__ = __webpack_require__(176);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_network_interface__ = __webpack_require__(177);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ng_idle_core__ = __webpack_require__(89);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_diagnostic__ = __webpack_require__(85);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_open_native_settings__ = __webpack_require__(87);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_native_background_mode__ = __webpack_require__(187);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_login_login__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__ionic_native_local_notifications__ = __webpack_require__(188);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__providers_remote_control_remote_control__ = __webpack_require__(189);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__providers_authentication_authentication__ = __webpack_require__(94);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__providers_projector_api_projector_api__ = __webpack_require__(51);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};














var GeneralControlPage = /** @class */ (function () {
    function GeneralControlPage(app, platform, navCtrl, navParam, alertCtrl, toastCtrl, remoteCtrlService, authenticationService, ProjectorApiService, geolocation, hotspot, networkInterface, idle, localNotifications, diagnostic, openNativeSettings, loadingCtrl, backgroundMode, viewCtrl) {
        var _this = this;
        this.app = app;
        this.platform = platform;
        this.navCtrl = navCtrl;
        this.navParam = navParam;
        this.alertCtrl = alertCtrl;
        this.toastCtrl = toastCtrl;
        this.remoteCtrlService = remoteCtrlService;
        this.authenticationService = authenticationService;
        this.ProjectorApiService = ProjectorApiService;
        this.geolocation = geolocation;
        this.hotspot = hotspot;
        this.networkInterface = networkInterface;
        this.idle = idle;
        this.localNotifications = localNotifications;
        this.diagnostic = diagnostic;
        this.openNativeSettings = openNativeSettings;
        this.loadingCtrl = loadingCtrl;
        this.backgroundMode = backgroundMode;
        this.viewCtrl = viewCtrl;
        this.username = this.navParam.get('username');
        this.roomID = this.navParam.get('roomID');
        this.signalID = this.navParam.get('signalID');
        this.checked = false;
        this.timer = setInterval(function () {
            _this.autoLogout();
        }, 3600000);
        this.timer2 = setInterval(function () {
            _this.CurrentUserOverride();
        }, 5000);
        this.PCColor = '#70c9e3';
        this.ProjectorOnColor = '#70c9e3';
        this.VGAColor = '#70c9e3';
        this.ProjectorOffColor = '#70c9e3';
        this.HDMIColor = '#70c9e3';
        this.ProjectorMuteColor = '#70c9e3';
        this.WirelessPresenterColor = '#70c9e3';
        this.ScreenUpDownColor = '#70c9e3';
        this.Aux1Color = '#70c9e3';
        this.PowerColor = '#70c9e3';
        this.AutoLockColor = '#70c9e3';
        this.platform.registerBackButtonAction(function () {
            var alertMessage = _this.alertCtrl.create({
                title: 'Do you want to exit the app?',
                buttons: [{
                        text: 'NO',
                        handler: function () {
                        }
                    },
                    {
                        text: 'YES',
                        handler: function () {
                            _this.remoteCtrlService.updateUsageLeave(_this.roomID, _this.username).subscribe(function (result) { return console.log("Result:" + result); }, function (error) { return console.log("Error" + error); });
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
        this.platform.ready().then(function () {
            _this.platform.pause.subscribe(function () {
                console.log('[INFO] App paused general-control.ts page');
                //this.ProjectorApiService.getUsage(this.roomID).subscribe(UsageData => {
                //  if (UsageData.CurrentlyUsed == true && UsageData.CurrentUser == this.username) {
                //    console.log("UsageData.Duration = " + UsageData.Duration);
                //    this.remoteCtrlService.updateUsageLeave(this.roomID, this.username).subscribe(result => console.log("Result:" + result), error => console.log("Error" + error));
                //    document.location.href = 'index.html';
                //  }
                //});
            });
            _this.platform.resume.subscribe(function () {
                console.log('[INFO] App resumed general-control.ts page');
            });
        });
    }
    GeneralControlPage_1 = GeneralControlPage;
    GeneralControlPage.prototype.ionViewDidEnter = function () {
        var _this = this;
        if (this.platform.is('cordova')) {
            this.diagnostic.isLocationEnabled().then(function (state) {
                if (state == false) {
                    var alertMessage = _this.alertCtrl.create({
                        title: 'Please turn on location services to access the projector functions',
                        buttons: [{
                                text: 'No thanks',
                                handler: function () {
                                }
                            }, {
                                text: 'Open Location Settings',
                                handler: function () {
                                    _this.openNativeSettings.open('location');
                                }
                            }]
                    });
                    alertMessage.present();
                    clearInterval(_this.timer);
                    clearInterval(_this.timer2);
                    _this.navCtrl.pop();
                }
                else if (state == true) {
                    if (_this.platform.is('android')) {
                        _this.geolocation.getCurrentPosition().then(function (pos) {
                            console.log(pos.coords.latitude);
                        }).catch(function (err) {
                            console.log("error code: " + err.code);
                            console.log("error message: " + err.message);
                            var alertMessage = _this.alertCtrl.create({
                                title: 'Please give this app location access to access the projector functions',
                                buttons: [{
                                        text: 'OK'
                                    }]
                            });
                            alertMessage.present();
                            clearInterval(_this.timer);
                            clearInterval(_this.timer2);
                            _this.navCtrl.pop();
                        });
                    }
                }
            }).catch(function (err) { return console.log("error: " + err); });
        }
    };
    GeneralControlPage.prototype.ionViewWillEnter = function () {
        var _this = this;
        if (!this.platform.is('cordova')) {
            this.ProjectorApiService.getUsage(this.roomID).subscribe(function (UsageData) {
                console.log("UsageData.CurrentUser = " + UsageData.CurrentUser + "this.username = " + _this.username);
                if (UsageData.CurrentUser != _this.username) {
                    _this.app.getRootNav().push(GeneralControlPage_1, {
                        'username': _this.username,
                        'roomID': _this.roomID,
                        'signalID': _this.signalID
                    });
                }
            });
        }
    };
    GeneralControlPage.prototype.CurrentUserOverride = function () {
        var _this = this;
        console.log("Every 5 second");
        console.log("This page is " + this.navCtrl.getActive().name);
        this.ProjectorApiService.getUsage(this.roomID).subscribe(function (UsageData) {
            console.log("UsageData.CurrentUser = " + UsageData.CurrentUser + "this.username = " + _this.username);
            if (UsageData.CurrentUser != _this.username) {
                _this.backgroundMode.disable();
                console.log("Background mode: " + _this.backgroundMode.isEnabled());
                clearInterval(_this.timer);
                clearInterval(_this.timer2);
                var alertMessage = _this.alertCtrl.create({
                    title: UsageData.CurrentUser + ' has taken over room ' + _this.roomID + ' projector',
                    enableBackdropDismiss: false,
                    buttons: [{
                            text: 'OK',
                            handler: function () {
                                document.location.href = 'index.html';
                            }
                        }]
                });
                alertMessage.present();
            }
        });
    };
    GeneralControlPage.prototype.autoLogout = function () {
        console.log("Every 1 hour");
        this.remoteCtrlService.updateUsageLeave(this.roomID, this.username).subscribe(function (result) { return console.log("Result:" + result); }, function (error) { return console.log("Error" + error); });
        this.localNotifications.schedule({
            title: 'Logout Notice',
            text: 'You have been logged out'
        });
        this.app.getRootNav().push(__WEBPACK_IMPORTED_MODULE_9__pages_login_login__["a" /* LoginPage */]);
        this.backgroundMode.disable();
        console.log("Background mode: " + this.backgroundMode.isEnabled());
        clearInterval(this.timer);
        clearInterval(this.timer2);
    };
    GeneralControlPage.prototype.activateProjectorFunc = function (attributeID, value, Projector_Event) {
        var _this = this;
        var loadingMessage = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        loadingMessage.present();
        this.geolocation.getCurrentPosition({ enableHighAccuracy: true, timeout: 3000, maximumAge: 0 }).then(function (pos) {
            if (_this.platform.is('cordova')) {
                if (_this.platform.is('android')) {
                    _this.hotspot.getConnectionInfo().then(function (wifiInfo) {
                        _this.remoteCtrlService.sendRemoteCommand(_this.signalID, attributeID, value).subscribe(function (result) { return console.log("Result:" + result); }, function (error) { return console.log("Error" + error); });
                        _this.remoteCtrlService.sendEventLog(_this.roomID, _this.username, Projector_Event, pos.coords.latitude, pos.coords.longitude, wifiInfo.BSSID).subscribe(function (result) {
                            loadingMessage.dismiss();
                            console.log("Result:" + result);
                        }, function (error) {
                            loadingMessage.dismiss();
                            console.log("Error" + error);
                            var alertMessage = _this.alertCtrl.create({
                                title: "Please try either of the following or both:<br>",
                                subTitle: "1) Turn on your device's wifi<br>" +
                                    "2) Connect to NYP's wifi<br>" +
                                    "3) Try again",
                                buttons: [{
                                        text: 'No thanks',
                                        handler: function () {
                                        }
                                    }, {
                                        text: 'Open Wifi settings',
                                        handler: function () {
                                            _this.openNativeSettings.open("wifi");
                                        }
                                    }]
                            });
                            alertMessage.present();
                        });
                    }).catch(function (err) {
                        console.log("Hotspot pluggin Error: " + err.code);
                    });
                }
                if (_this.platform.is('ios')) {
                    _this.diagnostic.isWifiAvailable().then(function (wifiAvailability) {
                        if (wifiAvailability == 1) {
                            setTimeout(function () {
                                WifiWizard.getCurrentBSSID(function (bssid) {
                                    _this.remoteCtrlService.sendRemoteCommand(_this.signalID, attributeID, value).subscribe(function (result) { return console.log("Result:" + result); }, function (error) { return console.log("Error" + error); });
                                    _this.remoteCtrlService.sendEventLog(_this.roomID, _this.username, Projector_Event, pos.coords.latitude, pos.coords.longitude, bssid).subscribe(function (result) {
                                        loadingMessage.dismiss();
                                        console.log("Result:" + result);
                                    }, function (error) {
                                        loadingMessage.dismiss();
                                        console.log("Error" + error);
                                    });
                                }, function (err) {
                                    console.log("Wifiwizard error: " + err);
                                });
                            }, 2000);
                        }
                        if (wifiAvailability == 0) {
                            loadingMessage.dismiss();
                            var alertMessage = _this.alertCtrl.create({
                                title: "Please try either of the following or all of it:<br>",
                                subTitle: "1) Turn on your device's wifi<br>" +
                                    "2) Connect to NYP's wifi<br>" +
                                    "3) Try again",
                                buttons: [{
                                        text: 'No thanks',
                                        handler: function () {
                                        }
                                    }, {
                                        text: 'Open Wifi settings',
                                        handler: function () {
                                            _this.openNativeSettings.open("wifi");
                                        }
                                    }]
                            });
                            alertMessage.present();
                        }
                    });
                }
            }
            else {
                _this.remoteCtrlService.sendRemoteCommand(_this.signalID, attributeID, value).subscribe(function (result) { return console.log("Result:" + result); }, function (error) { return console.log("Error" + error); });
                _this.remoteCtrlService.sendEventLog(_this.roomID, _this.username, Projector_Event, pos.coords.latitude, pos.coords.longitude, "ff:ff:ff:ff:ff:ff").subscribe(function (result) {
                    loadingMessage.dismiss();
                    console.log("Result:" + result);
                }, function (error) {
                    loadingMessage.dismiss();
                    console.log("Error" + error);
                    var alertMessage = _this.alertCtrl.create({
                        title: "Please try either of the following or both:<br>",
                        subTitle: "1) Turn on your device's wifi<br>" +
                            "2) Connect to NYP's wifi<br>" +
                            "3) Try again",
                        buttons: [{
                                text: 'OK',
                                handler: function () {
                                }
                            }]
                    });
                    alertMessage.present();
                });
            }
        }).catch(function (err) {
            if (_this.platform.is('cordova')) {
                _this.diagnostic.isWifiAvailable().then(function (wifiAvailability) {
                    if (wifiAvailability == 0) {
                        loadingMessage.dismiss();
                        console.log("error code: " + err.code + " Error message: " + err.message);
                        var alertMessage = _this.alertCtrl.create({
                            title: "Please try either of the following or all of it:<br>",
                            subTitle: "1) Turn on your device's wifi<br>" +
                                "2) Connect to NYP's wifi<br>" +
                                "3) Try again",
                            buttons: [{
                                    text: 'No thanks',
                                    handler: function () {
                                    }
                                }, {
                                    text: 'Open Wifi settings',
                                    handler: function () {
                                        _this.openNativeSettings.open("wifi");
                                    }
                                }]
                        });
                        alertMessage.present();
                    }
                    if (wifiAvailability == 1) {
                        loadingMessage.dismiss();
                    }
                });
            }
            else {
                loadingMessage.dismiss();
                var alertMessage = _this.alertCtrl.create({
                    title: "Please try either of the following or all of it:<br>",
                    subTitle: "1) Turn on location services if you are using a mobile browser<br>" +
                        "2) Give this app access to your location on your browser<br>" +
                        "3) Connect to NYP's wifi",
                    buttons: [{
                            text: 'Ok',
                            handler: function () {
                            }
                        }]
                });
                alertMessage.present();
            }
        });
    };
    GeneralControlPage.prototype.printStatus = function (content) {
        var toastMessage = this.toastCtrl.create({
            message: content,
            duration: 3000,
            position: 'bottom',
            dismissOnPageChange: true
        });
        toastMessage.present();
    };
    GeneralControlPage.prototype.turnOn = function (control) {
        control = '#6392ff';
    };
    GeneralControlPage.prototype.turnOff = function (control) {
        control = '#70c9e3';
    };
    GeneralControlPage.prototype.logOut = function () {
        var _this = this;
        var alertMessage = this.alertCtrl.create({
            title: 'Do you want to logout?',
            buttons: [{
                    text: 'NO',
                    handler: function () {
                    }
                },
                {
                    text: 'YES',
                    handler: function () {
                        localStorage.clear();
                        _this.remoteCtrlService.updateUsageLeave(_this.roomID, _this.username).subscribe(function (result) { return console.log("Result:" + result); }, function (error) { return console.log("Error" + error); });
                        _this.backgroundMode.disable();
                        console.log("Background mode: " + _this.backgroundMode.isEnabled());
                        clearInterval(_this.timer);
                        clearInterval(_this.timer2);
                        _this.app.getRootNav().push(__WEBPACK_IMPORTED_MODULE_9__pages_login_login__["a" /* LoginPage */]);
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
    };
    GeneralControlPage.prototype.checkBox = function (e) {
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
            this.printStatus("System is off");
            this.activateProjectorFunc("SYSTEM_POWER", "false", "Projector Off and Screen Up");
        }
    };
    GeneralControlPage.prototype.ProjectorOn = function () {
        if (this.ProjectorOnColor === '#70c9e3') {
            this.turnOn(this.ProjectorOnColor);
            this.printStatus("Projector is on");
            this.activateProjectorFunc("DISPLAY_POWER", "true", "Projector On");
        }
        else {
            this.printStatus("Projector is already on");
        }
    };
    GeneralControlPage.prototype.ProjectorOff = function () {
        if (this.ProjectorOnColor === '#70c9e3') {
            this.turnOff(this.ProjectorOnColor);
            this.printStatus("Project is off");
            this.activateProjectorFunc("DISPLAY_POWER", "false", "Projector Off");
        }
        else {
            this.printStatus("Project is already off");
        }
    };
    GeneralControlPage.prototype.PC = function () {
        if (this.PCColor === '#70c9e3') {
            this.turnOn(this.PCColor);
            this.turnOff(this.ProjectorOffColor);
            this.turnOff(this.HDMIColor);
            this.turnOff(this.WirelessPresenterColor);
            this.turnOff(this.Aux1Color);
            this.printStatus("PC is on");
            this.activateProjectorFunc("PC", "true", "Switched to PC");
        }
        else {
            this.printStatus("PC is already on");
        }
    };
    GeneralControlPage.prototype.VGA = function () {
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
        }
        else {
            this.printStatus("VGA is already on");
        }
    };
    GeneralControlPage.prototype.ProjectorMute = function () {
        if (this.ProjectorMuteColor === '#70c9e3') {
            this.turnOn(this.ProjectorMuteColor);
            this.printStatus("Projector is muted");
            this.activateProjectorFunc("5415dc35-3dd0-42ed-b702-38ad1314f983", "true", "Projector is muted");
        }
        else {
            this.turnOff(this.ProjectorMuteColor);
            this.printStatus("Projector is umuted");
            this.activateProjectorFunc("81a3869b-d6be-4d54-9491-366bc1bda52e ", "true", "Projector is unmuted");
        }
    };
    GeneralControlPage.prototype.HDMI = function () {
        if (this.HDMIColor === '#70c9e3') {
            this.turnOn(this.HDMIColor);
            this.turnOff(this.VGAColor);
            this.turnOff(this.PCColor);
            this.turnOff(this.WirelessPresenterColor);
            this.turnOff(this.Aux1Color);
            this.printStatus("HDMI is on");
            this.activateProjectorFunc("HDMI", "true", "Switched to HDMI");
        }
        else {
            this.turnOff(this.HDMIColor);
            this.printStatus("HDMI is aready on");
        }
    };
    GeneralControlPage.prototype.ScreenUpDown = function () {
        if (this.ScreenUpDownColor === '#70c9e3') {
            this.turnOn(this.ScreenUpDownColor);
            this.printStatus("Screen is going down");
            this.activateProjectorFunc("c93e210e-91d9-4890-afc6-0de3923b665d", "true", "Screen Down");
        }
        else {
            this.turnOff(this.ScreenUpDownColor);
            this.printStatus("Screen is going up");
            this.activateProjectorFunc("84b833e7-78bb-43f1-a4a7-4241cec76424 ", "true", "Screen Up");
        }
    };
    GeneralControlPage.prototype.WirelessPresenter = function () {
        if (this.WirelessPresenterColor === '#70c9e3') {
            this.turnOn(this.WirelessPresenterColor);
            this.turnOff(this.VGAColor);
            this.turnOff(this.HDMIColor);
            this.turnOff(this.PCColor);
            this.turnOff(this.Aux1Color);
            this.printStatus("Wireless presenter is on");
            this.activateProjectorFunc("Wireless%20Presenter", "true", "Switched to Wireless Presenter");
        }
        else {
            this.printStatus("Wireless presenter is already on");
        }
    };
    GeneralControlPage.prototype.Aux1 = function () {
        if (this.Aux1Color === '#70c9e3') {
            this.turnOn(this.Aux1Color);
            this.turnOff(this.VGAColor);
            this.turnOff(this.HDMIColor);
            this.turnOff(this.WirelessPresenterColor);
            this.turnOff(this.PCColor);
            this.printStatus("Aux is on");
            this.activateProjectorFunc("Aux%201", "true", "Switched to Aux1");
        }
        else {
            this.printStatus("Aux is already on");
        }
    };
    GeneralControlPage.prototype.AutoLock = function () {
        if (this.AutoLockColor === '#70c9e3') {
            this.turnOn(this.Aux1Color);
            this.printStatus("Autolock is on");
        }
        else {
            this.printStatus("Autolock is already on");
        }
    };
    GeneralControlPage.prototype.setVolume = function () {
        //Add codes to set volume
    };
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
    GeneralControlPage.prototype.ionViewWillUnload = function () {
        console.log('ionViewWillUnload general-ControlPage');
        this.remoteCtrlService.updateUsageLeave(this.roomID, this.username).subscribe(function (result) { return console.log("Result:" + result); }, function (error) { return console.log("Error" + error); });
        this.backgroundMode.disable();
        console.log("Background mode: " + this.backgroundMode.isEnabled());
        clearInterval(this.timer);
        clearInterval(this.timer2);
    };
    GeneralControlPage = GeneralControlPage_1 = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-general-control',template:/*ion-inline-start:"C:\Project\CrestronMobileApp\src\pages\general-control\general-control.html"*/'<ion-content class="bg">\n\n  <h5 class="roomName">Welcome to {{roomID}}</h5>\n\n  <div class="col2">\n\n    <ion-card class="offStatus" *ngIf="!PowerColor">\n\n      <ion-card-content>\n\n        <ion-label (click)="systemToggle()">System is {{systemStatus}}</ion-label>\n\n      </ion-card-content>\n\n    </ion-card>\n\n    <ion-card class="onStatus" *ngIf="PowerColor">\n\n      <ion-card-content>\n\n        <ion-label (click)="systemToggle()">System is {{systemStatus}}</ion-label>\n\n      </ion-card-content>\n\n    </ion-card>\n\n  </div>\n\n  <div class="row">\n\n    <div class="col">\n\n      <ion-card class="offStatus" *ngIf="!ProjectorOnColor">\n\n        <ion-card-content>\n\n          <img class="imageButton" src="assets/imgs/projector.png">\n\n          <ion-label (click)="ProjectorOn()" class="buttonLabel">\n\n            Projector\n\n            <br>On\n\n          </ion-label>\n\n        </ion-card-content>\n\n      </ion-card>\n\n      <ion-card class="onStatus" *ngIf="ProjectorOnColor">\n\n        <ion-card-content>\n\n          <img class="imageButton" src="assets/imgs/projector.png">\n\n          <ion-label (click)="ProjectorOn()" class="buttonLabel">\n\n            Projector\n\n            <br>On\n\n          </ion-label>\n\n        </ion-card-content>\n\n      </ion-card>\n\n    </div>\n\n    <div class="col">\n\n      <ion-card class="offStatus" *ngIf="!ProjectorOffColor">\n\n        <ion-card-content>\n\n          <img class="imageButton" src="assets/imgs/projector.png">\n\n          <ion-label (click)="ProjectorOff()" class="buttonLabel">\n\n            Projector\n\n            <br>Off\n\n          </ion-label>\n\n        </ion-card-content>\n\n      </ion-card>\n\n      <ion-card class="onStatus" *ngIf="ProjectorOffColor">\n\n        <ion-card-content>\n\n          <img class="imageButton" src="assets/imgs/projector.png">\n\n          <ion-label (click)="ProjectorOff()" class="buttonLabel">\n\n            Projector\n\n            <br>Off\n\n          </ion-label>\n\n        </ion-card-content>\n\n      </ion-card>\n\n    </div>\n\n    <div class="col">\n\n      <ion-card class="offStatus" *ngIf="!ProjectorMuteColor">\n\n        <ion-card-content>\n\n          <img class="imageButton" src="assets/imgs/projector.png">\n\n          <ion-label (click)="ProjectorMute()" class="buttonLabel">\n\n            Projector\n\n            <br>Mute\n\n          </ion-label>\n\n        </ion-card-content>\n\n      </ion-card>\n\n      <ion-card class="onStatus" *ngIf="ProjectorMuteColor">\n\n        <ion-card-content>\n\n          <img class="imageButton" src="assets/imgs/projector.png">\n\n          <ion-label (click)="ProjectorMute()" class="buttonLabel">\n\n            Projector\n\n            <br>Mute\n\n          </ion-label>\n\n        </ion-card-content>\n\n      </ion-card>\n\n    </div>\n\n  </div>\n\n  <div class="row">\n\n    <div class="col">\n\n      <ion-card class="offStatus" *ngIf="!VGAColor">\n\n        <ion-card-content>\n\n          <img class="imageButton" src="assets/imgs/vga.png">\n\n          <ion-label (click)="VGA()" class="buttonLabel">\n\n            Visualizer\n\n            <br>VGA\n\n          </ion-label>\n\n        </ion-card-content>\n\n      </ion-card>\n\n      <ion-card class="onStatus" *ngIf="VGAColor">\n\n        <ion-card-content>\n\n          <img class="imageButton" src="assets/imgs/vga.png">\n\n          <ion-label (click)="VGA()" class="buttonLabel">\n\n            Visualizer\n\n            <br>VGA\n\n          </ion-label>\n\n        </ion-card-content>\n\n      </ion-card>\n\n    </div>\n\n    <div class="col">\n\n      <ion-card class="offStatus" *ngIf="!PCColor">\n\n        <ion-card-content>\n\n          <img class="imageButton" src="assets/imgs/pc.png">\n\n          <ion-label (click)="PC()" class="buttonLabel">PC</ion-label>\n\n        </ion-card-content>\n\n      </ion-card>\n\n      <ion-card class="onStatus" *ngIf="PCColor">\n\n        <ion-card-content>\n\n          <img class="imageButton" src="assets/imgs/pc.png">\n\n          <ion-label (click)="PC()" class="buttonLabel">PC</ion-label>\n\n        </ion-card-content>\n\n      </ion-card>\n\n    </div>\n\n    <div class="col">\n\n      <ion-card class="offStatus" *ngIf="!HDMIColor">\n\n        <ion-card-content>\n\n          <img class="imageButton" src="assets/imgs/hdmi.png">\n\n          <ion-label (click)="HDMI()" class="buttonLabel">HDMI</ion-label>\n\n        </ion-card-content>\n\n      </ion-card>\n\n      <ion-card class="onStatus" *ngIf="HDMIColor">\n\n        <ion-card-content>\n\n          <img class="imageButton" src="assets/imgs/hdmi.png">\n\n          <ion-label (click)="HDMI()" class="buttonLabel">HDMI</ion-label>\n\n        </ion-card-content>\n\n      </ion-card>\n\n    </div>\n\n  </div>\n\n  <div class="row">\n\n    <div class="col">\n\n      <ion-card class="offStatus" *ngIf="!WirelessPresenterColor">\n\n        <ion-card-content>\n\n          <img class="imageButton" src="assets/imgs/remote.png">\n\n          <ion-label (click)="WirelessPresenter()" class="buttonLabel">\n\n            Wireless\n\n            <br>Presenter\n\n          </ion-label>\n\n        </ion-card-content>\n\n      </ion-card>\n\n      <ion-card class="onStatus" *ngIf="WirelessPresenterColor">\n\n        <ion-card-content>\n\n          <img class="imageButton" src="assets/imgs/remote.png">\n\n          <ion-label (click)="WirelessPresenter()" class="buttonLabel">\n\n            Wireless\n\n            <br>Presenter\n\n          </ion-label>\n\n        </ion-card-content>\n\n      </ion-card>\n\n    </div>\n\n    <div class="col">\n\n      <ion-card class="offStatus" *ngIf="!Aux1Color">\n\n        <ion-card-content>\n\n          <img class="imageButton" src="assets/imgs/auxcable.png">\n\n          <ion-label (click)="Aux1()" class="buttonLabel">AUX</ion-label>\n\n        </ion-card-content>\n\n      </ion-card>\n\n      <ion-card class="onStatus" *ngIf="Aux1Color">\n\n        <ion-card-content>\n\n          <img class="imageButton" src="assets/imgs/auxcable.png">\n\n          <ion-label (click)="Aux1()" class="buttonLabel">AUX</ion-label>\n\n        </ion-card-content>\n\n      </ion-card>\n\n    </div>\n\n    <div class="col">\n\n      <ion-card class="offStatus" *ngIf="!AutoLockColor">\n\n        <ion-card-content>\n\n          <img class="imageButton" src="assets/imgs/autolock.png">\n\n          <ion-label (click)="AutoLock()" class="buttonLabel">\n\n            Auto\n\n            <br>Lock\n\n          </ion-label>\n\n        </ion-card-content>\n\n      </ion-card>\n\n      <ion-card class="onStatus" *ngIf="AutoLockColor">\n\n        <ion-card-content>\n\n          <img class="imageButton" src="assets/imgs/autolock.png">\n\n          <ion-label (click)="AutoLock()" class="buttonLabel">\n\n            Auto\n\n            <br>Lock\n\n          </ion-label>\n\n        </ion-card-content>\n\n      </ion-card>\n\n    </div>\n\n  </div>\n\n  <div class="row">\n\n    <div class="col-s">\n\n      <ion-card class="offStatus" *ngIf="!ScreenUpDownColor">\n\n        <ion-card-content>\n\n          <img class="imageButton" src="assets/imgs/screen.png">\n\n          <ion-label (click)="ScreenUpDown()" class="buttonLabel">\n\n            Screen\n\n            <br>Up/Down\n\n          </ion-label>\n\n        </ion-card-content>\n\n      </ion-card>\n\n      <ion-card class="onStatus" *ngIf="ScreenUpDownColor">\n\n        <ion-card-content>\n\n          <img class="imageButton" src="assets/imgs/screen.png">\n\n          <ion-label (click)="ScreenUpDown()" class="buttonLabel">\n\n            Screen\n\n            <br>Up/Down\n\n          </ion-label>\n\n        </ion-card-content>\n\n      </ion-card>\n\n    </div>\n\n    <div class="col2">\n\n      <ion-card class="offStatus">\n\n        <ion-card-content>\n\n          <ion-item>\n\n            <ion-range [(ngModel)]="singleValue" color="secondary" pin="true">\n\n              <ion-icon small range-left color="light" name="volume-down"></ion-icon>\n\n              <ion-icon range-right color="light" name="volume-up"></ion-icon>  \n\n            </ion-range>\n\n          </ion-item>\n\n        </ion-card-content>\n\n      </ion-card>\n\n    </div>\n\n  </div>\n\n'/*ion-inline-end:"C:\Project\CrestronMobileApp\src\pages\general-control\general-control.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* App */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* Platform */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* ToastController */], __WEBPACK_IMPORTED_MODULE_11__providers_remote_control_remote_control__["a" /* RemoteControlProvider */], __WEBPACK_IMPORTED_MODULE_12__providers_authentication_authentication__["a" /* AuthenticationProvider */], __WEBPACK_IMPORTED_MODULE_13__providers_projector_api_projector_api__["a" /* ProjectorApiProvider */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_geolocation__["a" /* Geolocation */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_hotspot__["a" /* Hotspot */], __WEBPACK_IMPORTED_MODULE_4__ionic_native_network_interface__["a" /* NetworkInterface */], __WEBPACK_IMPORTED_MODULE_5__ng_idle_core__["a" /* Idle */], __WEBPACK_IMPORTED_MODULE_10__ionic_native_local_notifications__["a" /* LocalNotifications */], __WEBPACK_IMPORTED_MODULE_6__ionic_native_diagnostic__["a" /* Diagnostic */], __WEBPACK_IMPORTED_MODULE_7__ionic_native_open_native_settings__["a" /* OpenNativeSettings */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_8__ionic_native_background_mode__["a" /* BackgroundMode */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* ViewController */]])
    ], GeneralControlPage);
    return GeneralControlPage;
    var GeneralControlPage_1;
}());

//# sourceMappingURL=general-control.js.map

/***/ }),

/***/ 94:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthenticationProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(50);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var AuthenticationProvider = /** @class */ (function () {
    function AuthenticationProvider(http) {
        this.http = http;
        this.apiUrl = 'https://crestron.sit.nyp.edu.sg/TestAPI/api/';
    }
    AuthenticationProvider.prototype.login = function (credentials) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]();
        headers.append('Content-Type', 'application/json');
        var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestOptions */]({ headers: headers });
        return this.http.post(this.apiUrl + 'Values?username=' + credentials.username + '&pwd=' + credentials.password, JSON.stringify(credentials), options)
            .map(function (res) { return res.json(); });
    };
    AuthenticationProvider.prototype.logout = function () {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]();
        headers.append('X-Auth-Token', localStorage.getItem('token'));
        return this.http.post(this.apiUrl + 'logout', {}, { headers: headers }).map(function (res) { return res.json(); });
    };
    AuthenticationProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */]])
    ], AuthenticationProvider);
    return AuthenticationProvider;
}());

//# sourceMappingURL=authentication.js.map

/***/ })

},[232]);
//# sourceMappingURL=main.js.map