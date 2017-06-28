import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../constants/constants';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

/**
 * Service permettant de manipuler les notifications contenues en base
 */
@Injectable()
export class NotificationService {

  constructor(public http: Http) {
  }

  /**
   * Récupère l'ensemble des notifications en base
   */
  getNotifications(): Observable<any> {
    let httpAddress: string = `${environment.backendUrl}/notification/list`
    return this.http.get(httpAddress)
    .map(res => res.json())
    .catch((error: any) => Observable.throw(error.json() || 'Server error'));
  }

  /**
   * Permet d'envoyer l'information au back lorsqu'une notification est marquée comme "lue"
   * @param id : id de la notification à marquer comme "lue"
   */
  markAsRead(id: number): Observable<any> {
    let httpAddress: string = `${environment.backendUrl}/notification/markasread/${id}`;
    return this.http.post(httpAddress, {})
    .map(res => res.json())
    .catch((error: any) => Observable.throw(error.json() || 'Server error'));
  }

}
