import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Offer } from '../../models/index';

@Component({
  selector: 'page-offers-list',
  templateUrl: 'offers-list.html',
})
export class OffersListPage {

  offersList: any[];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.offersList = [{
      title: 'title',
      description: 'description'
    },
    {
      title: "autre title",
      description: 'autre description'
    }];
  }

  ionViewDidLoad() {

  }

  handleOfferClick(): void {
    console.log('click');
  }

}
