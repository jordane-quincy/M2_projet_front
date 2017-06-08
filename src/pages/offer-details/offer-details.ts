import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { OfferService, ToastService } from '../../providers/index';
import * as _ from 'lodash';

@Component({
  selector: 'page-offer-details',
  templateUrl: 'offer-details.html',
})
export class OfferDetailsPage {

  offer: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private offerService: OfferService, private toastService: ToastService) {
    if(this.navParams.data) {
      this.offer = this.navParams.data.offer;
    }
  }

  ionViewDidLoad() {

  }

  subscribe(id: number){
    console.log(id);
    var body = {"IdOffer": id};
    this.offerService.subscribeOffer(body).subscribe(
      res => {
        this.toastService.presentToast("Demande envoyée", "success");
      },
      err => {
        this.toastService.presentToast((err || {}).message, "alert");
      }
    );
  }

}
