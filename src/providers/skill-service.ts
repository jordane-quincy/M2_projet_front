import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../constants/constants';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class SkillService {

  constructor(public http: Http) {

  }

  getSkills(): Observable<any> {
    let httpAddress: string = `${environment.backendUrl}/skill/list`
    return this.http.get(httpAddress)
    .map(res => res.json())
    .catch((error: any) => Observable.throw(error.json() || 'Server error'));
  }

  validateSkill(body: any): Observable<any> {
    let httpAddress: string = `${environment.backendUrl}/skill/validate`
    return this.http.post(httpAddress, JSON.stringify(body))
    .map(res => res.json())
    .catch((error: any) => Observable.throw(error.json() || 'Server error'));
  }

}
