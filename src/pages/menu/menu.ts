import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { LoginPage } from '../login/login';
import { ProfilePage } from '../profile/profile';
import { UserOffersPage } from '../user-offers/user-offers';
import { PendingRequestPage } from '../pending-request/pending-request';
import { AddOfferPage } from '../add-offer/add-offer';
import { AppointmentPage } from '../appointment/appointment';

@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class MenuPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {

  }

  openPageProfil()
  {
    this.navCtrl.push(ProfilePage);
  }

  openPageUserOffers()
  {
    this.navCtrl.push(UserOffersPage);
  }


  openPageAddOffer()
  {
    this.navCtrl.push(AddOfferPage);
  }

  openPageAppointment(){
    this.navCtrl.push(AppointmentPage);
  }

  openPagePendingRequest(){
    this.navCtrl.push(PendingRequestPage);
  }

  exit(){

  }

}
