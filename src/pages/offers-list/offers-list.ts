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
    // this.offersList = [{
    //   id:1,
    //   title: 'title',
    //   description: 'description description description description description description description description description description description description description description description description description description description description description',
    //   duration: 1,
    //   lastname:'Dupont',
    //   firstname: 'michelle',
    //   domain:{"id":2,
    //           "domainName":"Arts"
    //          }
    // },
    // {
    //   id:2,
    //   title: "autre title",
    //   description: 'autre description',
    //   duration: 2
    // },{
    //   id:3,
    //   title: 'title',
    //   description: 'description',
    //   duration: 1
    // },
    // {
    //   id:4,
    //   title: "autre title",
    //   description: 'autre description',
    //   duration: 2
    // },{
    //   id:5,
    //   title: 'title',
    //   description: 'description description description description description description description description description description description description description description description description description description description description description',
    //   duration: 1
    // },
    // {
    //   id:6,
    //   title: "autre title",
    //   description: 'autre description',
    //   duration: 2
    // },{
    //   id:7,
    //   title: 'title',
    //   description: 'description',
    //   duration: 1
    // },
    // {
    //   id:8,
    //   title: "autre title",
    //   description: 'autre description',
    //   duration: 2
    // }];
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
    this.offerservice.getAllOffers().subscribe(
      result => {
        this.offersList = (_.cloneDeep(result) || []).map(offer => {
          return {
            id: offer.id,
            title: offer.title,
            description: offer.description,
            duration: offer.duration,
            lastname : offer.user.userName,
            firstname: offer.user.userFirstName,
            domain:{ "id" : offer.domain.id,
                 "domainName" : offer.domain.domainName
            }
          };
        });
        console.log(result);
      },
      error => {
        this.toastService.presentToast((error || {}).message, "alert");
      }
    );
  }

}
