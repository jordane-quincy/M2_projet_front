import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../constants/constants';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

/**
 * Service permettant de manipuler les offres contenues en base.
 */
@Injectable()
export class OfferService {

  constructor(public http: Http) {

  }

  /**
   * Récupère la liste des offres de l'utilisateur courant
   */
  getUserOffers(): Observable<any> {
    let httpAddress: string = `${environment.backendUrl}/offer/list`;
    return this.http.get(httpAddress)
      .map(res => res.json())
      .catch((error: any) => Observable.throw(error.json()));
  }

  /**
   * Récupère la liste de toutes les offres stockées en base
   */
  getAllOffers(): Observable<any> {
    let httpAddress: string = `${environment.backendUrl}/offer/search`;
    return this.http.get(httpAddress)
      .map(res => res.json())
      .catch((error: any) => Observable.throw(error.json()));
  }

  /**
   * Récupère la liste des rendez-vous. Ce sont les demandes au statut 'VALIDATED'
   */
  getAppointment(): Observable<any> {
    let httpAddress: string = `${environment.backendUrl}/subscribe/attemptSubscriptions`
    return this.http.post(httpAddress, JSON.stringify({ 'status': 'VALIDATED' }))
      .map(res => res.json())
      .catch((error: any) => Observable.throw(error.json() || 'Server error'));
  }

  /**
  * Récupère la liste des demandes en attente d'approbation. Ce sont les demandes au statut 'PENDING'
  */
  getAllPendingRequests(): Observable<any> {
    let httpAddress: string = `${environment.backendUrl}/subscribe/attemptSubscriptions`
    return this.http.post(httpAddress, JSON.stringify({ 'status': 'PENDING' }))
      .map(res => res.json())
      .catch((error: any) => Observable.throw(error.json() || 'Server error'));
  }

  /**
  * Récupère la liste des cours à donner
  */
  getCoursesToGive(): Observable<any> {
    let httpAddress: string = `${environment.backendUrl}/subscribe/participants`;
    return this.http.post(httpAddress, JSON.stringify({ 'status': 'VALIDATED' }))
      .map(res => res.json())
      .catch((error: any) => Observable.throw(error.json() || 'Server error'));
  }

  /**
   * Permet de supprimer une offre en base
   * @param id : id de l'offre à supprimer
   */
  deleteOffer(id: number): Observable<any> {
    let httpAddress: string = `${environment.backendUrl}/offer/delete/` + id;
    return this.http.delete(httpAddress)
      .map(res => res.json())
      .catch((error: any) => Observable.throw(error.json()));
  }

  /**
   * Permet de créer une nouvelle offre
   * @param body : objet représentatnt l'offre
   */
  createOffer(body: any): Observable<any> {
    let httpAddress: string = `${environment.backendUrl}/offer/create`;
    return this.http.post(httpAddress, JSON.stringify(body))
      .map(res => res.json())
      .catch((error: any) => Observable.throw(error.json()));
  }

  /**
   * Permet de s'inscrire à une offre
   * @param body : objet contenant l'id de l'offre à laquelle on souhaite souscrire
   */
  subscribeOffer(body: any): Observable<any> {
    let httpAddress: string = `${environment.backendUrl}/subscribe/sub`;
    return this.http.post(httpAddress, JSON.stringify(body))
      .map(res => res.json())
      .catch((error: any) => Observable.throw(error.json()));
  }

  /**
  * Permet de se désinscrire d'une offre
  * @param body : objet contenant l'id de l'offre à laquelle on souhaite se désinscrire
  */
  unsubscribeOffer(body: any): Observable<any> {
    let httpAddress: string = `${environment.backendUrl}/subscribe/unsub`;
    return this.http.post(httpAddress, JSON.stringify(body))
      .map(res => res.json())
      .catch((error: any) => Observable.throw(error.json()));
  }

  /**
   * Permet de mettre à jour une offre
   * @param body : objet contenant la structure de l'offre
   * @param id : id de l'offre à modifier
   */
  updateOffer(body: any, id: number): Observable<any> {
    let httpAddress: string = `${environment.backendUrl}/offer/update/` + id;
    return this.http.post(httpAddress, JSON.stringify(body))
      .map(res => res.json())
      .catch((error: any) => Observable.throw(error.json()));
  }

  /**
   * Récupère la liste de toutes les demandes à approuver
   * @param body : objet représentation la valeur du statut des demandes à récupérer. 
   */
  getRequestsToApprove(body: any): Observable<any> {
    let httpAddress: string = `${environment.backendUrl}/subscribe/participants`;
    return this.http.post(httpAddress, JSON.stringify(body))
      .map(res => res.json())
      .catch((error: any) => Observable.throw(error.json() || 'Server error'));
  }

  /**
   * Permet de mettre à jour une demande de rendez-vous, notamment pour la valider
   * @param body : contient les informations nécessaires pour la validation
   */
  updateAppointment(body: any): Observable<any> {
    let httpAddress: string = `${environment.backendUrl}/subscribe/update`;
    return this.http.post(httpAddress, JSON.stringify(body))
      .map(res => res.json())
      .catch((error: any) => Observable.throw(error.json()));
  }

  /**
   * Récupère la liste des offres en fonction des critères donnés
   * @param body : objet contenant la liste des filtres
   */
  getOffersByFilters(body: any): Observable<any> {
    let httpAddress: string = `${environment.backendUrl}/offer/filter`;
    return this.http.post(httpAddress, JSON.stringify(body))
      .map(res => res.json())
      .catch((error: any) => Observable.throw(error.json()));
  }

  /**
   * Permet de donner son avis sur un cours
   * @param body : objet contenant le commentaire et la note à donner
   * @param id : id de l'offre à évaluer
   */
  addUserComment(body: any, id: number): Observable<any> {
    let httpAddress: string = `${environment.backendUrl}/offer/comment/` + id;
    return this.http.post(httpAddress, JSON.stringify(body))
      .map(res => res.json())
      .catch((error: any) => Observable.throw(error.json()));
  }
}
