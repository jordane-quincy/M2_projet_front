import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { UserOffersPage } from '../user-offers/user-offers';

@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class MenuPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {

  }

  openPageUserOffers()
  {
    this.navCtrl.push(UserOffersPage);
  }
}
