import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../constants/constants';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import * as _ from 'lodash';

@Injectable()
export class UserService {

  user: any;

  constructor(public http: Http) {

  }

  getUser(): any {
    return this.user;
  }

  setUser(user: any): void {
    this.user = user;
  }

  getUserCredit(): any {
    return _.get(this.user, 'credit', 0);
  }

  setUserCredit(credit: number): any {
    this.user.credit = credit;
  }

  login(body: any): Observable<any> {
    return this.http.post("http://httpbin.org/post", JSON.stringify(body))
    .map(res => res.json())
    .catch((error: any) => Observable.throw(error.json()));
  }

  createAccount(body: any): Observable<any> {
    let httpAddress: string = `${environment.backendUrl}/user/create`;
    return this.http.post(httpAddress, JSON.stringify(body))
    .map(res => res.json())
    .catch((error: any) => Observable.throw(error.json()));
  }

  updateAccount(body: any): Observable<any> {
    let httpAddress: string = `${environment.backendUrl}/user/update`
    return this.http.post(httpAddress, JSON.stringify(body))
    .map(res => res.json())
    .catch((error: any) => Observable.throw(error.json()));
  }

  deleteAccount(body: any): Observable<any> {
    let httpAddress: string = `${environment.backendUrl}/user/delete`
    return this.http.delete(httpAddress, JSON.stringify(body))
    .map(res => res.json())
    .catch((error: any) => Observable.throw(error.json()));
  }

  // Ask if we can go to reset password screen, check if user exists with the email
  askForResetPassword(body: any): Observable<any> {
    let httpAddress: string = `${environment.backendUrl}/user/askResetPassword`
    return this.http.post(httpAddress, JSON.stringify(body))
    .map(res => res.json())
    .catch((error: any) => Observable.throw(error.json()));
  }

  resetPassword(body: any): Observable<any> {
    let httpAddress: string = `${environment.backendUrl}/user/resetPassword`
    return this.http.post(httpAddress, JSON.stringify(body))
    .map(res => res.json())
    .catch((error: any) => Observable.throw(error.json()));
  }
}
