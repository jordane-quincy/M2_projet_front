import { Injectable } from '@angular/core';

@Injectable()
export class TokenService {

  private token: any;

  constructor() {

  }

  getToken(): any {
      return this.token;
  }

  setToken(token: any): void {
      this.token = token;
  }

}
