import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../constants/constants';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


@Injectable()
export class OfferService {

  constructor(public http: Http) {

  }

  getOffers(): Observable<any> {
    let httpAddress: string = `${environment.backendUrl}/offer/list`;
    return this.http.get(httpAddress)
    .map(res => res.json())
    .catch((error: any) => Observable.throw(error.json()));
  }

  getDomaines(): Observable<any> {
    let httpAddress: string = `${environment.backendUrl}/domaine/list`
    return this.http.get(httpAddress)
    .map(res => res.json())
    .catch((error: any) => Observable.throw(error.json() || 'Server error'));
  }

  createOffer(body: any): Observable<any> {
    let httpAddress: string = `${environment.backendUrl}/offer/create`;
    return this.http.post(httpAddress, JSON.stringify(body))
    .map(res => res.json())
    .catch((error: any) => Observable.throw(error.json()));
  }

}
