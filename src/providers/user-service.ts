import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class UserService {

  constructor(public http: Http) {

  }

  createAccount(body: any): Observable<any> {
     let headers = new Headers({ 'Content-Type': 'application/json' });
     return this.http.post("http://localhost:8080/user/create", JSON.stringify(body), headers)
       .catch((error: any) => Observable.throw(error.json() || 'Server error'));
  }

  // Ask if we can go to reset password screen, check if user exists with the email
  askForResetPassword(body: any): Observable<any> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    return this.http.post("http://httpbin.org/post", JSON.stringify(body), headers)
      .catch((error: any) => Observable.throw(error.json() || 'Server error'));
  }

  resetPassword(body: any): Observable<any> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    return this.http.post("http://httpbin.org/post", JSON.stringify(body), headers)
      .catch((error: any) => Observable.throw(error.json() || 'Server error'));
  }
}
