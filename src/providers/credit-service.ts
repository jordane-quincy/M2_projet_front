import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class CreditProvider {

  credit: number;

  constructor(public http: Http) {
    this.credit = 0;
  }

  getCredit(): number {
    return this.credit;
  }

  setCredit(credit: number): void {
    this.credit = credit;
  }

}
