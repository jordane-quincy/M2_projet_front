import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';

import { AddOfferPage } from '../add-offer/add-offer';

import { OfferService, ToastService, LoaderService } from '../../providers/index';

@Component({
  selector: 'page-user-offers',
  templateUrl: 'user-offers.html',
})
export class UserOffersPage {

  userOffersList: any[];

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, private offerService: OfferService, private toastService: ToastService, private loaderService: LoaderService) {
  }

  ionViewDidLoad() {
    this.retrieveData();
  }

  retrieveData(refresher?: any) {
    if(!refresher) {
      this.loaderService.presentLoaderDefault('Chargement des offres');
    }
    this.offerService.getUserOffers().subscribe(
      res => {
        this.userOffersList = res;
        refresher ? refresher.complete() : this.loaderService.dismissLoader();
      },
      err => {
        this.toastService.presentToast((err || {}).message, "alert");
        refresher ? refresher.complete() : this.loaderService.dismissLoader();
      }
    );
  }

  showConfirm(id: number): void {
    let confirm = this.alertCtrl.create({
      title: 'Confirmation de suppression',
      message: 'Etes vous sûr de vouloir supprimer cette offre ?',
      buttons: [
        {
          text: 'Annuler',
          role: 'cancel'
        },
        {
          text: 'Supprimer',
          handler: () => {
            this.loaderService.presentLoaderDefault('Suppression en cours');
            this.userOffersList = this.userOffersList.filter(element => element.id !== id);
            this.offerService.deleteOffer(id).subscribe(
              res => {
                this.toastService.presentToast((res || {}).message, "success");
                this.loaderService.dismissLoader();
              },
              err => {
                this.toastService.presentToast((err || {}).message, "alert");
                this.loaderService.dismissLoader();
              }
            );
          }
        }
      ]
    });
    confirm.present();
  }

  modifyOffer(offer: any): void {
    this.navCtrl.push(AddOfferPage, {
      offer: offer
    });
  }

}
