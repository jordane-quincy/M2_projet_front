import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';;

import { environment } from '../constants/constants';

/**
 * Service permettant de gérer l'authentification sur l'application
 */
@Injectable()
export class AuthService {

  constructor(public http: Http) {

  }

  /**
   * Permet de faire la requête pour la demande de connection à l'application
   * @param body : objet content l'adresse mail et le mot de passe de connecxion
   */
  login(body: any): Observable<any> {
		let httpAddress: string = `${environment.backendUrl}/auth/connect`;
		return this.http.post(httpAddress, JSON.stringify(body))
		.map(res => res.json())
		.catch((error: any) => Observable.throw(error.json()));
  }

  /**
   * Permet de faire la requête pour la demande de déconnexion, afin d'invalider le token en cours d'utilisation
   */
  disconnect(): Observable<any> {
		let httpAddress: string = `${environment.backendUrl}/auth/disconnect`;
		return this.http.post(httpAddress, {})
		.map(res => res.json())
		.catch((error: any) => Observable.throw(error.json()));
  }

}
