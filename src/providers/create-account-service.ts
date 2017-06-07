import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class CreateAccountService {

  constructor(public http: Http) {

  }

  createAccount(body: Object): Observable<any> {
     let headers = new Headers({ 'Content-Type': 'application/json' });
     return this.http.post("http://google.com", JSON.stringify(body), headers)
       .catch((error: any) => Observable.throw(error.json() || 'Server error'));
  }
}
