import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { OfferService, ToastService } from '../../providers/index';

@Component({
  selector: 'page-offer-details',
  templateUrl: 'offer-details.html',
})
export class OfferDetailsPage {

  offer: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private offerService: OfferService, private toastService: ToastService) {
    if(this.navParams.data) {
      this.offer = this.navParams.data.offer;
      console.log(this.offer);
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

    console.log(stars);

    return stars;
  }

  subscribe(id: number){
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
