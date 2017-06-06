import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

/*
  Generated class for the CreateAccountServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
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
