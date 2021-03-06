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

  getUserOffers(): Observable<any> {
    let httpAddress: string = `${environment.backendUrl}/offer/list`;
    return this.http.get(httpAddress)
    .map(res => res.json())
    .catch((error: any) => Observable.throw(error.json()));
  }

  getAllOffers(): Observable<any> {
    let httpAddress: string = `${environment.backendUrl}/offer/search`;
    return this.http.get(httpAddress)
    .map(res => res.json())
    .catch((error: any) => Observable.throw(error.json()));
  }

  getDomaines(): Observable<any> {
    let httpAddress: string = `${environment.backendUrl}/domain/list`
    return this.http.get(httpAddress)
    .map(res => res.json())
    .catch((error: any) => Observable.throw(error.json() || 'Server error'));
  }

  getAppointment(): Observable<any> {
    let httpAddress: string = `${environment.backendUrl}/subscribe/attemptSubscriptions`
    return this.http.post(httpAddress, JSON.stringify({'status' : 'VALIDATED'}))
    .map(res => res.json())
    .catch((error: any) => Observable.throw(error.json() || 'Server error'));
  }

  getAllRequests(): Observable<any> {
    let httpAddress: string = `${environment.backendUrl}/subscribe/attemptSubscriptions`
    return this.http.post(httpAddress, JSON.stringify({'status' : 'PENDING'}))
    .map(res => res.json())
    .catch((error: any) => Observable.throw(error.json() || 'Server error'));
  }

  getCoursesToGive(): Observable<any> {
    let httpAddress: string = `${environment.backendUrl}/subscribe/participants`;
    return this.http.post(httpAddress, JSON.stringify({'status' : 'VALIDATED'}))
    .map(res => res.json())
    .catch((error: any) => Observable.throw(error.json() || 'Server error'));
  }

   deleteOffer(id: number): Observable<any> {
    let httpAddress: string = `${environment.backendUrl}/offer/delete/`+id;
    return this.http.delete(httpAddress)
    .map(res => res.json())
    .catch((error: any) => Observable.throw(error.json()));
  }

  createOffer(body: any): Observable<any> {
    let httpAddress: string = `${environment.backendUrl}/offer/create`;
    return this.http.post(httpAddress, JSON.stringify(body))
    .map(res => res.json())
    .catch((error: any) => Observable.throw(error.json()));
  }

  subscribeOffer(body: any): Observable<any> {
    let httpAddress: string = `${environment.backendUrl}/subscribe/sub`;
     return this.http.post(httpAddress, JSON.stringify(body))
    .map(res => res.json())
    .catch((error: any) => Observable.throw(error.json()));
  }

  unsubscribeOffer(body: any): Observable<any> {
    let httpAddress: string = `${environment.backendUrl}/subscribe/unsub`;
     return this.http.post(httpAddress, JSON.stringify(body))
    .map(res => res.json())
    .catch((error: any) => Observable.throw(error.json()));
  }

  updateOffer(body: any, id: number): Observable<any> {
    let httpAddress: string = `${environment.backendUrl}/offer/update/`+id;
    return this.http.post(httpAddress, JSON.stringify(body))
    .map(res => res.json())
    .catch((error: any) => Observable.throw(error.json()));
  }

  getAllAppointments(body: any): Observable<any> {
    let httpAddress: string = `${environment.backendUrl}/subscribe/participants`;
    return this.http.post(httpAddress, JSON.stringify(body))
    .map(res => res.json())
    .catch((error: any) => Observable.throw(error.json() || 'Server error'));
  }

  updateAppointment(body: any): Observable<any> {
    let httpAddress: string = `${environment.backendUrl}/subscribe/update`;
    return this.http.post(httpAddress, JSON.stringify(body))
    .map(res => res.json())
    .catch((error: any) => Observable.throw(error.json()));
  }

  getOffersByFilters(body: any): Observable<any> {
    let httpAddress: string = `${environment.backendUrl}/offer/filter`;
    return this.http.post(httpAddress, JSON.stringify(body))
    .map(res => res.json())
    .catch((error: any) => Observable.throw(error.json()));
  }

  addUserComment(body: any, id: number): Observable<any> {
    let httpAddress: string = `${environment.backendUrl}/offer/comment/` + id;
    return this.http.post(httpAddress, JSON.stringify(body))
    .map(res => res.json())
    .catch((error: any) => Observable.throw(error.json()));
  }
}
