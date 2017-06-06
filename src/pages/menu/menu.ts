import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { ProfilPage } from '../profil/profil';
import { UserOffersPage } from '../user-offers/user-offers';
<<<<<<< HEAD
import { AddOfferPage } from '../add-offer/add-offer';
=======
import { AppointmentPage } from '../appointment/appointment';
>>>>>>> 6936f4b9b59c5c594b9b3ba01b93a0ec3389f4f3
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

<<<<<<< HEAD
  openPageAddOffer()
  {
    this.navCtrl.push(AddOfferPage);
=======
  openPageAppointment(){
    this.navCtrl.push(AppointmentPage);
>>>>>>> 6936f4b9b59c5c594b9b3ba01b93a0ec3389f4f3
  }
}
