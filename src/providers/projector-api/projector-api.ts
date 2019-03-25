import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Observable';
/*
  Generated class for the ProjectorApiProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ProjectorApiProvider {

  data: any;

  constructor(public http: HttpClient, private http2: Http) {
    console.log('Hello ProjectorApiProvider Provider');
  }

  getProjectors(EncryptedRoomNum) {
    return this.http.get("https://crestron.sit.nyp.edu.sg/TestAPI/api/Values?EncryptedRoomNum=" + EncryptedRoomNum)
      .do(this.logResponse)
      .catch(this.catchError)
  }

  getUsage(RoomNum) {
    return this.http.get("https://crestron.sit.nyp.edu.sg/TestAPI/api/UsageCheckAPI?RoomNum1=" + RoomNum)
      .do(this.logResponse)
      .catch(this.catchError)
  }

  updateUsage(RoomNum: string, username: string) {
    let headers = new Headers({ 'Content-Type': 'multipart/form-data' });
    let options = new RequestOptions({ headers: headers });

    console.log('Sending Event Log : https://crestron.sit.nyp.edu.sg/TestAPI/api/UsageCheckAPI?RoomNum=' + RoomNum + '&CurrentUser=' + username + '&CurrentlyUsed=1');
    return this.http2.post('https://crestron.sit.nyp.edu.sg/TestAPI/api/UsageCheckAPI?RoomNum=' + RoomNum + '&CurrentUser=' + username + '&CurrentlyUsed=1', JSON.stringify(this.data), options).map(res => res.json());
  }

  InsertRoomNum(RoomNum: string, username: string) {
    let headers = new Headers({ 'Content-Type': 'multipart/form-data' });
    let options = new RequestOptions({ headers: headers });

    console.log('Sending Event Log : https://crestron.sit.nyp.edu.sg/TestAPI/api/UsageCheckAPI?RoomNum2' + RoomNum + '&CurrentUser2=' + username + '&CurrentlyUsed2=0');
    return this.http2.post('https://crestron.sit.nyp.edu.sg/TestAPI/api/UsageCheckAPI?RoomNum2=' + RoomNum + '&CurrentUser2=' + username + '&CurrentlyUsed2=0', JSON.stringify(this.data), options).map(res => res.json());
  }

  private catchError(error: Response | any) {
    console.log(error);
    return Observable.throw(error.json().error || "Server error.");
  }

  private logResponse(res: Response) {
    console.log(res)
  }
}
