import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../constants/constants';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

/**
 * Service permettant de récupérer la liste des compétences stockées en base
 */
@Injectable()
export class SkillService {

  constructor(public http: Http) {

  }

  /**
   * Récupère la liste des compétences
   */
  getSkills(): Observable<any> {
    let httpAddress: string = `${environment.backendUrl}/skill/list`
    return this.http.get(httpAddress)
    .map(res => res.json())
    .catch((error: any) => Observable.throw(error.json() || 'Server error'));
  }

  /**
   * Permet de valider une compétence (uniquement pour un professeur)
   * @param body : objet contenant l'id de la compétence à valider
   */
  validateSkill(body: any): Observable<any> {
    let httpAddress: string = `${environment.backendUrl}/skill/validate`
    return this.http.post(httpAddress, JSON.stringify(body))
    .map(res => res.json())
    .catch((error: any) => Observable.throw(error.json() || 'Server error'));
  }

}
