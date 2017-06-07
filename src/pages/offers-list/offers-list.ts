import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { OfferDetailsPage } from '../offer-details/offer-details';

@Component({
  selector: 'page-offers-list',
  templateUrl: 'offers-list.html',
})
export class OffersListPage {

  offersList: any[];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.offersList = [{
      title: 'title',
      description: 'description description description description description description description description description description description description description description description description description description description description description',
      duration: 1
    },
    {
      title: "autre title",
      description: 'autre description',
      duration: 2
    },{
      title: 'title',
      description: 'description',
      duration: 1
    },
    {
      title: "autre title",
      description: 'autre description',
      duration: 2
    },{
      title: 'title',
      description: 'description description description description description description description description description description description description description description description description description description description description description',
      duration: 1
    },
    {
      title: "autre title",
      description: 'autre description',
      duration: 2
    },{
      title: 'title',
      description: 'description',
      duration: 1
    },
    {
      title: "autre title",
      description: 'autre description',
      duration: 2
    }];
  }

  handleOfferClick(offer: any): void {
    this.navCtrl.push(OfferDetailsPage, {
      offer: offer
    });
  }

}
