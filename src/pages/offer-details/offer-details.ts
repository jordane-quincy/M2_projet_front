import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-offer-details',
  templateUrl: 'offer-details.html',
})
export class OfferDetailsPage {

  offer: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    if(this.navParams.data) {
      this.offer = this.navParams.data.offer;
    }
  }

  ionViewDidLoad() {

  }

}
