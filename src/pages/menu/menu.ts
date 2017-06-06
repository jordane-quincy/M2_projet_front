import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { ProfilPage } from '../profil/profil';
import { UserOffersPage } from '../user-offers/user-offers';
/**
 * Generated class for the Menu page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class MenuPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {

  }

  openPageProfil()
  {
    this.navCtrl.push(ProfilPage);
  }

  openPageUserOffers()
  {
    this.navCtrl.push(UserOffersPage);
  }
}
