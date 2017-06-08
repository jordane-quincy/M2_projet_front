import { Component } from '@angular/core';
import { NavController, AlertController, NavParams, App } from 'ionic-angular';

import { ProfilePage } from '../profile/profile';
import { UserOffersPage } from '../user-offers/user-offers';
import { PendingRequestPage } from '../pending-request/pending-request';
import { AddOfferPage } from '../add-offer/add-offer';
import { AppointmentPage } from '../appointment/appointment';
import { LoginPage } from '../login/login';

import { AuthService, ToastService, LoaderService, TokenService, UserService } from '../../providers/index';

@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class MenuPage {

  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              private app: App,
              private authService: AuthService, 
              private toastService: ToastService, 
              private loaderService: LoaderService,
              private tokenService: TokenService,
              private userService: UserService,
              private alertCtrl: AlertController
              ) {

  }

  openPageProfil(): void {
    this.navCtrl.push(ProfilePage);
  }

  openPageUserOffers(): void {
    this.navCtrl.push(UserOffersPage);
  }


  openPageAddOffer(): void {
    this.navCtrl.push(AddOfferPage);
  }

  openPageAppointment(): void {
    this.navCtrl.push(AppointmentPage);
  }

  openPagePendingRequest(): void {
    this.navCtrl.push(PendingRequestPage);
  }

  presentConfirm() {
    
  }

  disconnect(): void {
    let alert = this.alertCtrl.create({
      title: 'Confirmation de déconnexion',
      message: 'Êtes-vous sûr de vouloir vous déconnecter ?',
      buttons: [
        {
          text: 'Annuler',
          role: 'cancel'
        },
        {
          text: 'Se déconnecter',
          handler: () => {
            this.loaderService.presentLoaderDefault('Déconnexion en cours');
            this.authService.disconnect().subscribe(
              res => {
                this.tokenService.setToken(null);
                this.userService.setUser(null);
                this.loaderService.dismissLoader();
                this.app.getRootNav().setRoot(LoginPage);
              },
              error => {
                this.toastService.presentToast((error || {}).message, "alert");
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
