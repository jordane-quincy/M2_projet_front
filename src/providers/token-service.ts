import { Injectable } from '@angular/core';

/**
 * Service permettant de manipuler le token
 */
@Injectable()
export class TokenService {

  private token: any;

  constructor() {

  }

  /**
   * Récupère la valeur du token
   */
  getToken(): any {
      return this.token;
  }

  /**
   * Met à jour la valeur du token
   * @param token : Nouvelle valeur du token
   */
  setToken(token: any): void {
      this.token = token;
  }

}
