import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { OfferDetailsPage } from '../offer-details/offer-details';

import { OfferService, ToastService } from '../../providers/index';

@Component({
  selector: 'page-offers-list',
  templateUrl: 'offers-list.html',
})
export class OffersListPage {

  offersList: any[];

  constructor(public navCtrl: NavController, public navParams: NavParams, private offerservice: OfferService, public toastService: ToastService) {
    this.offersList = [{
      title: 'title',
      description: 'description description description description description description description description description description description description description description description description description description description description description',
      duration: 1,
      lastname:'Dupont',
      firstname: 'michelle',
      domain:{"id":2,
              "domainName":"Arts"
             }
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

  ionViewDidLoad() {
    this.getOfferList();
  }

  getOfferList(){
    this.offerservice.getOffers().subscribe(
      result => {
        console.log(result);
      },
      error => {
        console.log(error);
        this.toastService.presentToast((error || {}).message, "alert");
      }
    );
  }

}
