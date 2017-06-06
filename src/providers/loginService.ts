import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../constants/constants';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

/*
  Generated class for the Login provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class LoginService {


  constructor(public http: Http) {

  }

  connect(param: Object) : Observable<any> {
     let url: string = environment.backendUrl;
      const headers = new Headers();
        headers.append('Content-Type', 'application/json');

    return this.http.post(url, JSON.stringify(param), headers)
      .catch((error: any) => Observable.throw(error.json() || 'Server error'));


  }

}
