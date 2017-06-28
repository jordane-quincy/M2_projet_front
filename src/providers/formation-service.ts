import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../constants/constants';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

/**
* Service permettant de gérer les formations disponibles
*/
@Injectable()
export class FormationService {

  constructor(public http: Http) {

  }

  /**
   * Récupère la liste des formations disponibles
   */
  getFormations(): Observable<any> {
    let httpAddress: string = `${environment.backendUrl}/formation/list`
    return this.http.get(httpAddress)
    .map(res => res.json())
    .catch((error: any) => Observable.throw(error.json() || 'Server error'));
  }

}
