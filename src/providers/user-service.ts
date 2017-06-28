import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../constants/constants';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import * as _ from 'lodash';

/**
 * Service permettant de manipuler les utilisateurs stockés en base
 */
@Injectable()
export class UserService {

  user: any;

  constructor(public http: Http) {

  }

  /**
   * Retourne l'utilisateur courant
   */
  getUser(): any {
    return this.user;
  }
  
  /**
   * Met à jour l'utilisteur courant
   * @param user : Nouvel utilisateur
   */
  setUser(user: any): void {
    this.user = user;
  }

  /**
   * Retourne le nombre de crédits de l'utilisateur courant, retourne 0 si la valeur n'existe pas
   */
  getUserCredit(): any {
    return _.get(this.user, 'credit', 0);
  }

  /**
   * Met à jour le nombre de crédit de l'utilisateur courant
   * @param credit : Nouvelle valeur du crédit
   */
  setUserCredit(credit: number): any {
    this.user.credit = credit;
  }

  /**
   * Permet de récupérer le nombre de crédits de l'utilisateur courant 
   */
  getUserCreditFromBack(): Observable<any> {
    let httpAddress: string = `${environment.backendUrl}/user/credit`;
    return this.http.get(httpAddress)
    .map(res => res.json())
    .catch((error: any) => Observable.throw(error.json()));
  }

  /**
   * Permet de récupérer un utilisateur
   * @param id : id de l'utilisateur à récupérer
   */
  getUserById(id: number): Observable<any> {
    let httpAddress: string = `${environment.backendUrl}/user/get/${id}`;
    return this.http.get(httpAddress)
    .map(res => res.json())
    .catch((error: any) => Observable.throw(error.json()));
  }

  /**
   * Récupère la liste des commentaires et des notes d'un utilisateur
   * @param body : contient l'email de l'utilisateur
   */
  getCommentsAndMark(body: any): Observable<any> {
    let httpAddress: string = `${environment.backendUrl}/user/opinions`;
    return this.http.post(httpAddress, JSON.stringify(body))
    .map(res => res.json())
    .catch((error: any) => Observable.throw(error.json()));
  }

  /**
   * Permet de créer un nouvel utilisateur
   * @param body : objet contant la structure d'un utilisateur
   */
  createAccount(body: any): Observable<any> {
    let httpAddress: string = `${environment.backendUrl}/user/create`;
    return this.http.post(httpAddress, JSON.stringify(body))
    .map(res => res.json())
    .catch((error: any) => Observable.throw(error.json()));
  }

  /**
   * Permet de mettre à jour son profil utilisateur
   * @param body : objet contant la structure d'un utilisateur
   */
  updateAccount(body: any): Observable<any> {
    let httpAddress: string = `${environment.backendUrl}/user/update`
    return this.http.post(httpAddress, JSON.stringify(body))
    .map(res => res.json())
    .catch((error: any) => Observable.throw(error.json()));
  }

  /**
   * Effectue la demande de réinitilisation du mot de passe de l'utilisateur
   * @param body : contient l'adresse mail de l'utilisateur
   */
  askForResetPassword(body: any): Observable<any> {
    let httpAddress: string = `${environment.backendUrl}/user/askResetPassword`
    return this.http.post(httpAddress, JSON.stringify(body))
    .map(res => res.json())
    .catch((error: any) => Observable.throw(error.json()));
  }

  /**
   * Permet de réinitialiser le mot de passe
   * @param body : objet contenant la réponse  la question secrète et la nouvelel valeur du mot de passe
   */
  resetPassword(body: any): Observable<any> {
    let httpAddress: string = `${environment.backendUrl}/user/resetPassword`
    return this.http.post(httpAddress, JSON.stringify(body))
    .map(res => res.json())
    .catch((error: any) => Observable.throw(error.json()));
  }

}
