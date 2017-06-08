import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { OfferDetailsPage } from '../offer-details/offer-details';

import { OfferService, ToastService } from '../../providers/index';
import * as _ from 'lodash';

@Component({
  selector: 'page-offers-list',
  templateUrl: 'offers-list.html',
})
export class OffersListPage {

  offersList: any[];

  constructor(public navCtrl: NavController, public navParams: NavParams, private offerservice: OfferService, public toastService: ToastService) {
    
  }

  ionViewDidLoad() {
    this.getOfferList();
  }

  getOfferList(){
    this.offerservice.getAllOffers().subscribe(
      result => {
        this.offersList = result;        
      },
      error => {
        this.toastService.presentToast((error || {}).message, "alert");
      }
    );
  }

  handleOfferClick(offer: any): void {
    this.navCtrl.push(OfferDetailsPage, {
      offer: offer
    });
  }

}
