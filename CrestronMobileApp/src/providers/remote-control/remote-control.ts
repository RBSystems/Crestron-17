import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class RemoteControlProvider {

  data: any;

  constructor(private http: Http) {

  }

  sendRemoteCommand(signalID: string, attributeID: string, value: string) {
    let headers = new Headers({ 'Content-Type': 'multipart/form-data' });
    let options = new RequestOptions({ headers: headers, withCredentials: true });

    console.log('Sending remote command : https://fusion.sit.nyp.edu.sg/Fusion/apiservice/signalvalues/'+ signalID + '/' + attributeID + '?value=' + value + '&auth=Crestron1%200BF34A53-3DD3-438D-B88F-BEC77EAB3009');
    return this.http.put('https://fusion.sit.nyp.edu.sg/Fusion/apiservice/signalvalues/'+ signalID + '/' + attributeID + '?value=' + value + '&auth=Crestron1%200BF34A53-3DD3-438D-B88F-BEC77EAB3009', JSON.stringify(this.data), options).map(res => res.json());
  }

  sendEventLog(RoomNum: string, Username: string, Projector_Event: string, Latitude: number, Longitude: number, SSID: string) {
    let headers = new Headers({ 'Content-Type': 'multipart/form-data' });
    let options = new RequestOptions({ headers: headers });

    console.log('Sending Event Log : https://crestron.sit.nyp.edu.sg/TestAPI/api/Values?RoomNum=' + RoomNum + '&AccountID=' + Username + '&Projector_Function=' + Projector_Event + '&Latitude=' + Latitude + '&Longitude=' + Longitude + '&SSID=' + SSID);
    return this.http.post('https://crestron.sit.nyp.edu.sg/TestAPI/api/Values?RoomNum=' + RoomNum + '&AccountID=' + Username + '&Projector_Function=' + Projector_Event + '&Latitude=' + Latitude + '&Longitude=' + Longitude + '&SSID=' + SSID, JSON.stringify(this.data), options).map(res => res.json());
  }

  updateUsageLeave(RoomNum: string, username: string) {
    let headers = new Headers({ 'Content-Type': 'multipart/form-data' });
    let options = new RequestOptions({ headers: headers });

    console.log('Sending Event Log : https://crestron.sit.nyp.edu.sg/TestAPI/api/UsageCheckAPI?RoomNum=' + RoomNum + '&CurrentUser=' + username + '&CurrentlyUsed=0');
    return this.http.post('https://crestron.sit.nyp.edu.sg/TestAPI/api/UsageCheckAPI?RoomNum=' + RoomNum + '&CurrentUser=' + username + '&CurrentlyUsed=0', JSON.stringify(this.data), options).map(res => res.json());
  }
}
