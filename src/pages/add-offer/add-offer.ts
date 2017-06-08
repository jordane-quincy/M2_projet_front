import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController, NavParams } from 'ionic-angular';
import { ImagePicker } from '@ionic-native/image-picker';
import { OfferService, ToastService } from '../../providers/index';
import { UserOffersPage } from '../user-offers/user-offers';
import * as _ from 'lodash';

@Component({
  selector: 'page-add-offer',
  templateUrl: 'add-offer.html',
})
export class AddOfferPage {

  form: FormGroup;
  domaineList: any[];
  offer: any;
  updateMode: boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams, fb: FormBuilder, private imagePicker: ImagePicker, private offerService: OfferService, private toastService: ToastService) {
    if(this.navParams.data.offer) {
      this.offer = this.navParams.data.offer;
      this.updateMode = true;
    } else {
      this.updateMode = false;
    }
    this.form = fb.group({
      title: fb.control(this.updateMode ? this.offer.title : '', [Validators.required]),
      description: fb.control(this.updateMode ? this.offer.description : '', [Validators.required]),
      duration: fb.control(this.updateMode ? this.offer.duration : '1'),
      domainId: fb.control(this.updateMode ? this.offer.domain.id : '', [Validators.required])
    });

  }

  ionViewDidLoad() {
    // Get formation from back
    this.getDomainesFromBack();
  }

  getDomainesFromBack() {
    this.offerService.getDomaines().subscribe(
      res => {
        // initiate this.formationList with the response
        this.domaineList = (_.cloneDeep(res) || []).map(domaine => {
          return {
            id: domaine.id,
            label: domaine.domainName
          };
        });
      },
      err => {
        this.toastService.presentToast((err || {}).message, "alert");
      }
    );
  }

  getPic() {
    // this.imagePicker.getPictures(null).then(
    //   results => {
    //     for (var i = 0; i < results.length; i++) {
    //         console.log('Image URI: ' + results[i]);
    //     }
    //   },
    //   err => {
    //     console.log(err);
    //   }
    // );
    this.imagePicker.hasReadPermission().then(
      res => {
        console.log(res);
      },
      err => {
        console.log(err);
      }
    );

    this.imagePicker.requestReadPermission().then(
      res => {
        console.log(res);
      },
      err => {
        console.log(err);
      }
    );
  }

  add() {
      this.offerService.createOffer(this.form.value).subscribe(
      result => {
        this.toastService.presentToast("Votre offre a été ajoutée", "success");
        this.navCtrl.pop(UserOffersPage);
      },
      error => {
        this.toastService.presentToast((error || {}).message, "alert");
      }
    );
  }

  modify(){
    this.offerService.updateOffer(this.form.value, this.offer.id).subscribe(
      result => {
        this.toastService.presentToast("Votre offre a bien été modifiée", "success");
        this.navCtrl.pop(UserOffersPage);
      },
      error => {
        this.toastService.presentToast((error || {}).message, "alert");
      }
    );
  }

}
