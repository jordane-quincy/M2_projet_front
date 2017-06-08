import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';;

import { environment } from '../constants/constants';

@Injectable()
export class AuthService {

  constructor(public http: Http) {

  }

  login(body: any): Observable<any> {
		let httpAddress: string = `${environment.backendUrl}/auth/connect`;
		return this.http.post(httpAddress, JSON.stringify(body))
		.map(res => res.json())
		.catch((error: any) => Observable.throw(error.json()));
  }

  disconnect(): Observable<any> {
		let httpAddress: string = `${environment.backendUrl}/auth/disconnect`;
		return this.http.post(httpAddress, {})
		.map(res => res.json())
		.catch((error: any) => Observable.throw(error.json()));
  }

}
