import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Offer } from '../../models/index';

@IonicPage()
@Component({
  selector: 'page-offers-list',
  templateUrl: 'offers-list.html',
})
export class OffersListPage {

  offersList: Offer[];

  constructor(public navCtrl: NavController, public navParams: NavParams) {

  }

  ionViewDidLoad() {

  }

}
