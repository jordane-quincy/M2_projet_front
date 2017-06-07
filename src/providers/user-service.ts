import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class UserService {

  constructor(public http: Http) {

  }

  login(body: any): Observable<any> {
    return this.http.post("http://httpbin.org/post", JSON.stringify(body))
    .map(res => res.json())
    .catch((error: any) => Observable.throw(error.json() || 'Server error'));
  }

  createAccount(body: any): Observable<any> {
    return this.http.post("http://httpbin.org/post", JSON.stringify(body))
    .map(res => res.json())
    .catch((error: any) => Observable.throw(error.json() || 'Server error'));
  }

  // Ask if we can go to reset password screen, check if user exists with the email
  askForResetPassword(body: any): Observable<any> {
    return this.http.post("http://httpbin.org/post", JSON.stringify(body))
    .map(res => res.json())
    .catch((error: any) => Observable.throw(error.json() || 'Server error'));
  }

  resetPassword(body: any): Observable<any> {
    return this.http.post("http://httpbin.org/post", JSON.stringify(body))
    .map(res => res.json())
    .catch((error: any) => Observable.throw(error.json() || 'Server error'));
  }
}
