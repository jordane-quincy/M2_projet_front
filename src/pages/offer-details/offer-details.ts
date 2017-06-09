import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { OfferService, ToastService, UserService, LoaderService } from '../../providers/index';
import { ProfilePage } from '../../pages/profile/profile';

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

  ionViewDidLoad() {

  }

   starsDefinition(mark: any) {
    let i: any;
    let stars = [0,0,0,0,0];
    i = 0;

    while(mark > 0)
    {
      if((mark - 1) >= 0)
      {
        mark = mark - 1;
        stars[i] = 1;
      }
      else if(mark - 0.5 >= 0)
      {
        mark = mark - 0.5;
        stars[i] = 0.5;
      }
      else if(mark >= 0.25 && mark < 0.5)
      {
        if(stars[i-1] == 0.5)
        {
          mark = 0;
          stars[i-1] = 1;
        }
        else
        {
          mark = 0;
          stars[i] = 0.5;
        }
      }
      else
        mark = 0;

      i++;
    }
    return stars;
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
                this.userService.setUserCredit(res.user);
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

  goToProfilePage(id: number): void {
    this.navCtrl.push(ProfilePage, {userId: id});
  }

}
