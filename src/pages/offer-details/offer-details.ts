import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { OfferService, ToastService, UserService, LoaderService } from '../../providers/index';

@Component({
  selector: 'page-offer-details',
  templateUrl: 'offer-details.html',
})
export class OfferDetailsPage {

  offer: any;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              private offerService: OfferService, 
              private toastService: ToastService, 
              private userService: UserService,
              private loaderService: LoaderService,
              private alertCtrl: AlertController) {
    if(this.navParams.data) {
      this.offer = this.navParams.data.offer;
    }
  }

  subscribe(id: number) {
    let body: any = {"IdOffer": id};
    let alert = this.alertCtrl.create({
      title: 'Confirmation d\'inscription',
      message: 'Êtes-vous sûr de vouloir vous inscrire à cette offre ?',
      buttons: [
        {
          text: 'Annuler',
          role: 'cancel'
        },
        {
          text: 'S\'inscrire',
          handler: () => {
            this.loaderService.presentLoaderDefault('Inscription en cours');
            this.offerService.subscribeOffer(body).subscribe(
              res => {
                this.toastService.presentToast("Inscription envoyée !", "success");
                this.loaderService.dismissLoader();
                this.navCtrl.pop();
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
    alert.present();
  }

}
