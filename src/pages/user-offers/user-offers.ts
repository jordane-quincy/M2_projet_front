import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';

import { AddStudentPage } from '../add-student/add-student';
import { AddOfferPage } from '../add-offer/add-offer';

import { OfferService, ToastService } from '../../providers/index';
import * as _ from 'lodash';

@Component({
  selector: 'page-user-offers',
  templateUrl: 'user-offers.html',
})
export class UserOffersPage {

  userOffersList: any[];

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, private offerService: OfferService, private toastService: ToastService) {
  }

    ionViewDidLoad() {
    // Get formation from back
      this.getUserOffersFromBack();
    }

    getUserOffersFromBack() {
      this.offerService.getUserOffers().subscribe(
        res => {
          // initiate this.formationList with the response
          console.log(res);
          this.userOffersList = (_.cloneDeep(res) || []).map(offer => {
            return {
              id: offer.id,
              title: offer.title,
              description: offer.description,
              duration: offer.duration,
              domain: offer.domain,
              picture: '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'
            };
          });
        },
        err => {
          this.toastService.presentToast((err || {}).message, "alert");
        }
      );
    }

  showConfirm(id: number): void {
    let confirm = this.alertCtrl.create({
      title: 'Confirmation de suppression',
      message: 'Etes vous sur de vouloir supprimer cette offre ?',
      buttons: [
        {
          text: 'Annuler',
          handler:() => {
            console.log('annulation');
          }
        },
        {
          text:'Supprimer',
          handler: () => {
            this.userOffersList = this.userOffersList.filter(element => element.id !== id);
            this.offerService.deleteOffer(id).subscribe(
              res => {
                this.toastService.presentToast((res || {}).message, "success");
              },
              err => {
                this.toastService.presentToast((err || {}).message, "alert");
              }
            );
            console.log('Suppression');
          }
        }
      ]
    });
    confirm.present();
  }

  addStudent(){
    this.navCtrl.push(AddStudentPage);
  }

  modifyOffer(offer: any){
    this.navCtrl.push(AddOfferPage, {
      offer: offer
    });
  }

}
