import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';;

import { environment } from '../constants/constants';

/*
  Generated class for the DomainsServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class DomainsService {

  constructor(public http: Http) {

  }

  getDomainsList(): Observable<any> {
    let httpAddress: string = `${environment.backendUrl}/domain/list`;
    return this.http.get(httpAddress, {})
		.map(res => res.json())
		.catch((error: any) => Observable.throw(error.json()));
  }

}
