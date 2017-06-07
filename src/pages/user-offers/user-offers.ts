import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-user-offers',
  templateUrl: 'user-offers.html',
})
export class UserOffersPage {

  userOffersList: any[];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.userOffersList = [];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserOffers');
  }

}
