import { Injectable } from '@angular/core';
import { Http, HttpModule, Headers, RequestOptions } from '@angular/http';

@Injectable()
export class AuthenticationProvider {

  apiUrl: string = 'https://crestron.sit.nyp.edu.sg/TestAPI/api/';

  constructor(private http: Http) {
  }

  login(credentials) {

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: headers })

    return this.http.post(this.apiUrl + 'Values?username=' + credentials.username + '&pwd=' + credentials.password, JSON.stringify(credentials), options)
          .map(res => res.json());
  }

  logout() {
    
    let headers = new Headers();
    headers.append('X-Auth-Token', localStorage.getItem('token'));

    return this.http.post(this.apiUrl + 'logout', {}, { headers: headers }).map(res => res.json());
  }
}
